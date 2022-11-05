import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// import useHttp from '../hooks/use-http';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import useAuthorizedHttp from '../hooks/use-authorized-http';
import axios from 'axios';
import { DeleteRounded } from '@mui/icons-material';
import Input from '@mui/material/Input';
import { Home } from '../pages/generateAccount/Home/Home';

const Mint = () => {
    const [title, setTitle] = useState("");
    const [numberOfCopies, setNumberOfCopies] = useState(1)
    const [loyality, setLoyality] = useState(10)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false);
    // const [blockchain,setBlockchain] = useState();
    const [text, setText] = useState();
    const [refresh, setRefresh] = useState(true);
    // const [selectedCollectionItem, setSelectedCollectionItem] = useState( collection[0]);

    const [collections, setCollections] = useState([])
    // const makeAuthorizedRequest = useAuthorizedHttp();
    const [displayImage, setDispalyImage] = useState()
    const [showUploadButton, setShowUploadButton] = useState(false);
    const [preview, setPreview] = useState();
    const fileRef = useRef();
    const [type, setType] = useState('');
    const [s3url, setS3Url] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [displayImageUrl, setDisplayImageUrl] = useState("");
    let assetId;
    const location = useLocation();
    const appCtx = useSelector((state) => state.app);
    const marketplaceId = appCtx.marketplaceId;
    const dark = appCtx.isDarkMode;

    const blockchain = appCtx.blockchain
    const { id } = useParams();
    useEffect(() => {
        const url = new URL(window.location.href);

        setType(appCtx.paymentData.assetType);
        setS3Url(appCtx.paymentData.s3url);
        setIpfsHash(appCtx.paymentData.ipfsHash);
        assetId = appCtx.paymentData.assetId

    }, [location]);

    // useEffect(() => {
    //     setSelectedCollectionItem( collection[0]||collections[0]);


    //             makeAuthorizedRequest(
    //                 {
    //                     url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/marketplace/${ marketplaceId}/collection/list`
    //                 },
    //                 (data) => {
    //                    setCollections(data.content)
    //                 }

    //     );
    //     console.log(collections)
    // }, [collection,refresh, marketplaceId]);

    // useEffect(()=>{
    //     setSelectedCollectionItem( collection[0]||collections[0]);
    //     console.log(collections)
    // },[ collection,refresh, marketplaceId,collections])


    const [kv, setKV] = useState([]);
    const navigate = useNavigate();

    // const makeRequest = useHttp();



    const handleRemoveClick = useCallback((index) => {
        setKV((prev) => prev.splice(index, 1));
    }, []);

    const handleKVChange = useCallback(
        (e, index) => {
            const { name, value } = e.target;
            const list = [...kv];
            list[index][name] = value;
            setKV(list);
        },
        [kv]
    );
    const handleLogoChange = useCallback((file) => {
        if (file) {
            setDispalyImage(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setShowUploadButton(true);
            return () => URL.revokeObjectURL(objectUrl);
        }

    }, []);
    const handleUpload = () => {
        let flag = true;
        if (!displayImage) {
            toast.error("Display Image can't be empty");
            flag = false;
        }


        if (flag) {
            const data = new FormData();
            data.append("file", displayImage);
            setUploading(true)
            setShowUploadButton(false);

            let config = {
                method: "post",
                url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/marketplace/${marketplaceId}/s3/upload?type=displayimage`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-Auth-Token": appCtx.authToken,
                },
                data: data,
            };

            toast.promise(
                () =>
                    axios(config)
                        .then((res) => {
                            setDisplayImageUrl(res.data.fileUrl);

                            toast.success("display Image set Successfully")
                        })
                        .catch(function (error) {
                            toast.error("Uploading display image failed!");
                            setUploading(false);
                            setShowUploadButton(true)
                        }),
                {
                    pending: "Updating your marketplace settings...",
                    success: "Settings updated successfully!",
                    error: "Uh-oh! Something went wrong",
                }
            );
        }
    };
    const handleDoneClicked = useCallback(() => {

        console.log(appCtx)
        let flag = true;
        // if (!selectedCollectionItem) {

        //     toast.error("Collection can't be empty");
        //     flag = false;

        // }
        if (!title) {
            toast.error("Name can't be empty");
            flag = false;
        }
        // if (!price) {
        //     toast.error("Price can't be empty");
        //     flag = false;
        // }
        if (type === 'text' && !text) {
            toast.error('The nft text cant be empty!');
            flag = false;
        }
        // if(localStorage.getItem("blockchain")){
        //     blockchain = (localStorage.getItem("blockchain"));
        //     console.log(typeof  bug)
        //     flag=true
        // }

        if (flag) {
            const data = {
                collection: id,
                name: title,
                description,
                properties: kv,
                type: type,
                ipfsHash: ipfsHash,
                supportingFiles: [],
                displayImageUrl: displayImageUrl
            };
            type !== 'text' ? (data.ipfsHash = ipfsHash) : (data.description = text);
            // toast.promise(
            //     () =>
            //         makeRequest(
            //             {
            //                 url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/marketplace/${0}/blockchain/${localStorage.getItem("blockchain")}/nft/mint`,
            //                 data,
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                     'X-Auth-Token': appCtx.authToken,

            //                 }
            //             },
            //             (res) => {
            //                         console.log(res)
            //                 //     navigate(`/asset/${ ipfsHash}?title=${title}&s3url=${ s3url}&type=${ type}`)
            //             },
            //         ),
            //     {
            //         pending: 'Updating your NFT...',
            //         success: 'Minting request submitted',
            //         error: 'Something went wrong!'
            //     }
            // );
        }
    }, [
        title,
        type,
        ipfsHash,
        marketplaceId,
        s3url,
        description,
        text,
        kv,
        // makeRequest,
        appCtx.authToken,
        navigate,
        displayImageUrl
    ]);

    const handleSale = useCallback(() => {
        const blockchain = localStorage.getItem("blockchain");
        let flag = true;
        // if (!selectedCollectionItem) {

        //     toast.error("Collection can't be empty");
        //     flag = false;

        // }
        if (!title) {
            toast.error("Name can't be empty");
            flag = false;
        }
        // if (!price) {
        //     toast.error("Price can't be empty");
        //     flag = false;
        // }
        if (type === 'text' && !text) {
            toast.error('The nft text cant be empty!');
            flag = false;
        }
        // if(localStorage.getItem("blockchain")){
        //     blockchain = (localStorage.getItem("blockchain"));
        //     console.log(typeof blockchain)
        //     flag=true
        // }

        if (flag) {
            const data = {
                collection: id,
                name: title,
                description: description,
                properties: kv,
                type: type,
                ipfsHash: ipfsHash,
                supportingFiles: [],
                displayImageUrl: displayImageUrl
            };

            // toast.promise(
            //     () =>
            //         makeRequest(
            //             {
            //                 url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/marketplace/${0}/blockchain/${blockchain}/nft/mint`,
            //                 data,
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                     'X-Auth-Token': appCtx.authToken,

            //                 }
            //             },
            //             (res) => {

            //                     navigate(
            //                         `/salenft/${res.nftId}`
            //                     ) 
            //             },

            //         ),
            //     {
            //         pending: 'Updating your NFT...',
            //         success: 'Minting request submitted',
            //         error: 'Something went wrong!'
            //     }
            // );
        }
    }, [
        title,
        description,
        type,
        ipfsHash,
        marketplaceId,
        s3url,
        text,
        kv,
        // makeRequest,
        appCtx.authToken,
        navigate,
        displayImageUrl
    ]);



    return (

        <>
            {/* // <PageWrapper> */}
            <Home />
            <div
                style={{ display: "flex", justifyContent: "center" ,color:"black"}}
                className={`flex flex-col gap-10 pb-2 relative`}>
                {/* <Link to={'/mint'} className={'text-sky-500 no-underline flex items-center'}>
                    <KeyboardArrowLeftRounded />
                    <span>Go back</span>
                </Link> */}
                {/* <div className="text-xl font-semibold ">
                    { type === 'text' ? 'Mint data NFT' : 'Mint your asset'}
                </div> */}
                <div className="flex flex-col lg:flex-row gap-20 mx-[50px]">
                    <div className="grid gap-5 md:order-1 order-2 w-[55%]">
                        <div className="flex  items-center justify-between">
                            <div className="text-xl flex items-center font-semibold  ">NFT Details</div>
                            {/* <div> Wallet balance : 0</div> */}
                            <div className="flex flex-col w-56   justify-between items-center border border-gray-700 p-3 rounded-md">
                                {/* <div className="font-bold text-xl">NFT Interface</div> */}
                                <div className="">{localStorage.getItem('blockchain') === "ALGORAND" ? "ARC-0003" : "FLOW STANDARD"} </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="font-bold ">Name</div>
                            <Input
                                maxLength={32}
                                type="text"
                                className="border border-gray-700 px-4 py-2 rounded-md"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <div
                                className={`text-[12px] flex justify-end ${title?.length === 32 && 'text-red-700 italic '
                                    }`}
                            >
                                Character limit: 32
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-3 ">
                            <div className="font-bold">{type === "text" ? <>Title</> : <>Description</>}</div>
                            <Input
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    console.log(description);
                                }}
                                type="text"
                                className="border border-gray-700 px-4 py-5 rounded-md dark:text-black"
                            />
                        </div>

                        {/* <Select   className=""
                                    onChange
                                    value={""}
                                    data={""}
                                    header={'Number of copies'}
                                /> */}

                        <div className="flex flex-col gap-5">
                            {/* <div
                                className={`flex gap-5 ${collections?.length === 0 ? 'items-center' : 'items-center'} `}
                            >
                                {collections?.length === 0 ? (
                                    <div
                                        className={
                                            'text-gray-700 dark:text-gray-300 text-lg border border-gray-700 rounded-md p-3'
                                        }
                                    >
                                        You dont have any collections yet. Create one.
                                    </div>
                                ) : (
                                    <Select
                                        containerClassName="flex-col"
                                        className=" py-2 w-60"
                                        onChange={(d) => setSelectedCollectionItem(d)}
                                        value={selectedCollectionItem}
                                        data={collections}
                                        header={'Choose collection'}
                                    />
                                )}
                                <button onClick={() => setRefresh(!refresh)}>
                                    <Refresh />
                                </button>
                                <button
                                    onClick={ onOpenCreateCollection}
                                    className={
                                        'items-center flex px-5 gap-1 rounded-md py-1 border bg-secBlue text-white'
                                    }
                                    filled
                                >
                                    <AddCircle fontSize="small" /> <div>Add </div>
                                </button>
                            </div> */}
                            {/* <Select className="px-9" onChange value={''} data={''} header={'Choose Category'} /> */}
                        </div>
                        {/* <Input
                            header="Set title"
                            placeholder="My awesome NFT"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        /> */}
                        {/* <Input
                            header="Set price"
                            placeholder="Some resonable price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        /> */}
                        {kv.map((x, i) => (
                            <div className="flex flex-row gap-5 items-between justify-between">
                                <Input
                                    onChange={(e) => handleKVChange(e, i)}
                                    name="name"
                                    placeholder="Property"
                                    type="text"
                                    value={x.name}
                                />
                                <Input
                                    onChange={(e) => handleKVChange(e, i)}
                                    name="value"
                                    placeholder="Value"
                                    type="text"
                                    value={x.value}
                                />
                                <button
                                    onClick={() => handleRemoveClick(i)}
                                    className="bg-gray-100 hover:bg-gray-200 transition-all dark:bg-gray-700 dark:hover:bg-gray-600 ease-out duration-300 p-3 rounded mt-2"
                                >
                                    <DeleteRounded />
                                </button>
                            </div>
                        ))}

                        <button
                            className="w-fit"
                            onClick={() => setKV((prev) => [...prev, { name: '', value: '' }])}
                        >
                            Add property
                        </button>
                        {(type === "threeD" &&
                            <div className="flex gap-3 flex-col">
                                <div className='font-bold'>Display Image</div>
                                <div className='flex gap-3'>
                                    <div className=" flex items-center">
                                        <button
                                            className="bg-secBlue py-3 px-6 rounded-md text-white"
                                            onClick={() => fileRef.current.click()}
                                        >
                                            Browse
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileRef}
                                        hidden={true}
                                        onChange={(e) => handleLogoChange(e.target.files[0])}
                                    />
                                    {preview && <div className="flex  gap-3 justify-center">
                                        <div className="shadow-sm w-[30vw] h-[30vh]">
                                            <img src={preview} className="w-full h-full object-cover" />
                                        </div>
                                        <div className=" flex items-center">
                                            {showUploadButton && <button className="bg-secBlue py-3 px-2 rounded-md text-white" onClick={handleUpload}>
                                                Confirm
                                            </button>}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        )}
                        {/* <div className="flex justify-between flex-wrap ">
                            <div className="flex flex-col justify-between ">
                                <div className="font-bold">Number of copies</div>
                                <Input
                                    className="text-center py-2 rounded-md border px-10"
                                    type="text"
                                    value={numberOfCopies}
                                    onChange={(e) => setNumberOfCopies(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between flex-col">
                                <div className=" font-bold">Loyality Percantage</div>
                                <Input
                                    className="text-center py-2 rounded-md border px-10"
                                    value={loyality}
                                    onChange={(e) => setLoyality(e.target.value)}
                                ></Input>
                            </div>
                        </div> */}
                        {/* <div className="flex gap-8">
                            <div className=" font-bold">Subsidized by NFTVerse</div>
                            
                        </div> */}
                        <div className="flex gap-16">
                            <Link
                                className={'font-bold text-black no-underline flex items-center dark:text-white'}
                                to="/mint"
                            >
                                Cancel
                            </Link>
                            <button
                                className=" px-24 border-secBlue border rounded-md py-3 font-bold"
                                onClick={handleDoneClicked}
                            >
                                Mint
                            </button>
                            <button
                                className=" px-10 border-secBlue border rounded-md py-3 font-bold bg-secBlue"
                                onClick={handleSale}
                            >
                                Mint & Sale
                            </button>

                        </div>
                    </div>
                    <div className="w-full flex flex-col  gap-3 md:w-[50%] md:order-2 order-1 max-h-96">
                        <div className="text-xl font-semibold mb-10 ">Preview of your NFT</div>
                        {type === 'text' ? (
                            <div className={'ql-editor'} dangerouslySetInnerHTML={{ __html: text }} />
                        ) : type === 'image' ? (
                            <img
                                className="w-full shadow-lg rounded-lg object-contain h-full"
                                src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${s3url}`}
                                alt="NFT"
                            />
                        ) : type === 'video' ? (
                            <video
                                controls
                                autoPlay
                                className="w-full shadow-lg rounded-lg object-contain h-full"
                                src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${s3url}`}
                            />
                        ) : (
                            // <ThreeDRenderer
                            //     className={`w-full shadow-lg rounded-lg object-contain h-full`}
                            //     src={`${process.env.REACT_APP_URL_NFTVERSE_ASSETS}/${ s3url}`}
                            // />
                            <></>
                        )}

                        {type !== 'text' && (
                            <Input
                                header="Your ipfs hash"
                                disabled={true}
                                type="text"
                                className="text-sm text-black"
                                value={ipfsHash}
                            />
                        )}
                        {type !== 'text' && (
                            <button
                                className=" bg-secBlue rounded-md py-3 "
                                onClick={() =>
                                    window.open(
                                        `${process.env.REACT_APP_GATEWAY_PINATA_CLOUD}/${ipfsHash}`,
                                        '_blank',
                                        'noopener,noreferrer'
                                    )
                                }
                            >
                                View ipfs hash
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* // </PageWrapper> */}
        </>
    );
};

export default Mint;
