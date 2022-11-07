import axios from "axios";
import {useCallback} from "react";

const useHttp = () => {
	return useCallback(
		(requestOptions, successCallback, errorCallback, completeCallback) =>
			axios({
				method: requestOptions.method ? requestOptions.method.toLowerCase() : "GET",
				url: requestOptions.url,
				headers: requestOptions.headers ? requestOptions.headers : {},
				data: requestOptions.data ? JSON.stringify(requestOptions.data) : null,
			})
				.then((response) => {
					successCallback && successCallback(response.data);
				})
				.catch((response) => {
					errorCallback && errorCallback(response);
				})
				.finally(() => {
					completeCallback && completeCallback();
				}),
		[]
	);
};

export default useHttp;
