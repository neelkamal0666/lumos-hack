import axios from "axios"
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import { Cancel, CancelOutlined } from '@mui/icons-material';
import CustomButton from "../../ui/CustomButton";
import { appActions } from "../../context/app-slice";
import useHttp from "../../hooks/use-http";

const imageExtensions = ['jpg', 'jpeg', 'gif', 'tiff', 'psd', 'raw', 'png', 'svg'];
const videoExtensions = ['mp4', 'mov', 'wmv', 'avi', 'avchd', 'flv', 'f4v', 'swf', 'mkv', 'mpeg-2', 'webm'];
const threeDExtensions = ['fbx', 'obj', 'gltf', 'glb'];
const maxFileSize = 500 * 1024 * 1024;

const CreateItem = ({setIpfsUrl,setNftData}) => {
    const [showModal, setShowModal] = useState(false)
    const [uploadFile, setUploadFile] = useState();
    const [uploaded, setUploaded] = useState('0%');
    const [uploadFinished, setUploadFinished] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileType, setFileType] = useState('');
    const fileRef = useRef();
    const appCtx = useSelector((state) => state.app);
    const [asset, setAsset] = useState(null);
    const location = useLocation();
    const [showUploadSection, setShowUploadSection] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [mintNft, setMintNft] = useState(false);
    const navigate = useNavigate();
    const type = new URL(window.location.href).searchParams.get('type');
    const marketplaceId = appCtx.marketplaceId;
    const dispatch = useDispatch()
  const makeRequest = useHttp();

    const dark = appCtx.isDarkMode;
    // console.log(imageSrc);
    
    const submitForm = async () => {
        var data = new FormData();
        data.append('file', uploadFile);
        console.log(uploadFile, data);
        var reader = new FileReader();
        reader.onload = function (e) {
            // var image = document.createElement('img');
            // image.src = e.target.result;
            // document.body.appendChild(image);
            setImageSrc(e.target.result)
            dispatch(appActions.setImageSrc(e.target.result));
        }
        reader.readAsDataURL(uploadFile);
        // setUploading(true);
        let config = {
            method: 'post',
            url: `https://bs-dev.api.onnftverse.com/v1/marketplace/3/file/upload?type=${fileType}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Auth-Token': appCtx.authToken
            },
            onUploadProgress: (progressEvent) => {
                setUploaded(`${Number((progressEvent.loaded / uploadFile.size) * 100).toFixed(0)}%`);
            },
            data: data
        };
        if (uploadFile) {
            axios(config)
                .then((res) => {
                    console.log(res)
                    setUploading(false);
                    setAsset(res.data);
                    
                    dispatch(
                        appActions.paymentData({
                            ipfsHash: res.data.ipfsHash,
                            s3url: res.data.s3url,
                            assetId: res.data.assetId,
                            assetType: res.data.type
                        })
                    )
                    setUploadFinished(true);
                    uploadFinished()
                   
                })
                .catch((rej) => {
                    if (rej.response.status === 500) {
                        setUploading(false);
                        setUploadFinished(true);
                        setShowModal(true)
                    }
                })
        }






        // toast.promise(
        //     () =>
        //         new Promise((resolve, reject) =>
        //             axios(config)
        //                 .then(function (response) {
        //                     setUploading(false);
        //                     setAsset(response.data);
        //                     setUploadFinished(true);
        //                     resolve();
        //                 })
        //                 .catch(function () {
        //                     reject();
        //                 })
        //         ),
        //     {
        //         pending: 'Started upload...',
        //         success: 'Your asset was uploaded successfully!',
        //         error: 'There was an error while uploading your asset!'
        //     }
        // );
    };
    const unselectFile = () => {
        setAsset(null);
        setUploadFile(null);
        setImageSrc(null);
        dispatch(appActions.setImageSrc(null));
    }
    useEffect(() => {
        dispatch(appActions.setMintNft(false));
    }, [dispatch, appCtx.imageSrc])
    const stageForUpload = useCallback(
        (file) => {
            setAsset(null);
            if (!uploading) {
                setUploaded('0%');
                setUploadFile(file);
                setUploadFinished(false);
            } else {
                toast.error('Another upload still in progress!');

            }
        },
        []
    );

    const isFileValid = useCallback((file) => {
        if (file.size > maxFileSize) {
            toast.error('File size exceeds 500mb!');
            return false;
        }
        let extension = file.name.split('.');
        extension = extension[extension.length - 1];
        if (imageExtensions.includes(extension)) {
            setFileType('image');
            return true;
        } else if (videoExtensions.includes(extension)) {
            setFileType('video');
            return true;
        } else if (threeDExtensions.includes(extension)) {
            setFileType('threeD');
            console.log('threeD');
            return true;
        } else {
            return null;
        }
    }, []);

    const handleFileDropped = useCallback(
        (e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];

            if (isFileValid(f)) stageForUpload(f);
        },
        [isFileValid, stageForUpload]
    );

    const handleFileInputChange = useCallback(
        (e) => {
            const f = e.target.files[0];
            if (isFileValid(f)) stageForUpload(f);
        },
        [isFileValid, stageForUpload]
    );
    return (

        <div className={`flex flex-col sm:flex-row gap-10 text-black px-[20px]`} style={{ color: "black" }}>

            {(
                <div className="sm:grid grid-cols-2 gap-20 py-[40px] w-[100%]">
                    <div className="w-full flex flex-col gap-5">
                        <div className='font-semibold'>Upload asset  (Image , Video ,3D fbx supported )</div>
                        <button
                            draggable={true}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleFileDropped}
                            onClick={() => fileRef.current.click()}
                            onDrag={() => fileRef.current.drag()}
                            className="w-full border-2 border-dashed rounded h-[200px] items-center justify-center flex dark:bg-zinc-700/70 bg-gray-100/70 dark:hover:bg-sky-700/50 hover:bg-sky-100/50 transition-all ease-out duration-300"
                        >
                            <div>Drag and drop images here or browse...</div>
                            <input
                                draggable={true}
                                type="file"
                                className="hidden"
                                onChange={handleFileInputChange}
                                ref={fileRef}
                            />
                        </button>
                        {uploadFile && (
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between rounded-t  p-4">
                                    <div className="">{uploadFile.name}</div>
                                    <CustomButton onClick={unselectFile}>
                                        <Cancel />
                                    </CustomButton>
                                </div>
                                <div className="flex flex-row">
                                    <div
                                        className="h-2 bg-green-500 rounded-bl"
                                        style={{ width: uploaded }}
                                    ></div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 grow rounded-br"></div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center ">
                            <CustomButton
                                disabled={!uploadFile || uploading}
                                className={`px-28 w-[100%]`}
                                onClick={() => submitForm()}
                            >
                                Upload
                            </CustomButton>
                        </div>
                        {showModal && (
                            <div>
                                <div className="flex flex-col gap-5 py-6 relative">
                                    <CustomButton className='flex justify-end absolute right-2 -top-3 ' onClick={() => setShowModal(false)}><CancelOutlined /></CustomButton>
                                    <div className='flex w-96 flex-col'>
                                        This uploaded asset is owned & listed on marketplace for sale by
                                        someone else if you think its not you please do Raise a Dispute, we
                                        will help you out finding the appropriate solution.
                                        <span className='font-bold'>Send an email to info@onnftverse.com</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-[20px] flex flex-col justify-center gap-3">
                        {/* {asset ? (
                                        <div className="flex flex-col gap-[20vh] ">
                                            {asset?.type === 'image' ? (
                                                <div className="shadow-md p-4 rounded-md">
                                                    <img
                                                        src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${asset?.s3url}`}
                                                        className="h-[250px] w-[350px] object-contain"
                                                    />
                                                </div>
                                            ) : asset.type === 'video' ? (
                                                <video
                                                    controls
                                                    autoPlay
                                                    className="w-full shadow-lg rounded-lg object-contain h-full"
                                                    src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${asset?.s3url}`}
                                                />
                                            ) : (
                                                <ThreeDRenderer
                                                    className={`w-full shadow-lg rounded-lg object-contain h-full`}
                                                    src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${asset?.s3url}`}
                                                />
                                            )}
                                            <div className='flex justify-center'>
                                            */}
                        <CustomButton
                            className="bg-blue-500 text-slate-200 px-10 h-[40px] rounded-full"
                            onClick={() => {
                                // navigate(
                                //     `/mint/sasas`
                                // )
                                setMintNft(true)
                                dispatch(appActions.setMintNft(true))
                            }}
                        >
                            Mint NFT
                        </CustomButton>
                        {/* </div>
                                        </div>
                                    ) : (  */}
                        {/* <div className="w-full">
                                        //         <AssetItem asset={asset} />
                                        // </div>*/}


                        <div className="text-xl font-light h-[300px] dark:bg-inherit rounded-lg border-[10px] border-gray-100 dark:border-darkBorder shadow-md">
                            {!(appCtx.imageSrc === '' || appCtx.imageSrc === null) ?
                                <img style={{ height: "100%", width: "100%" }} src={appCtx.imageSrc} alt='' />
                                :
                                <div className="h-[100%] w-[100%] flex justify-center items-center">Click on Upload</div>
                            }
                        </div>
                        {/* )} */}
                    </div>
                </div>
            )}




        </div>

    );
};

export default CreateItem;
