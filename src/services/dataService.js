//if dev mode them URL prefix = http://127.0.0.1:8080/
//else
// prefix= .

// url= prefix + /users/xyz
import axios from 'axios';

const DEV_MODE_URL_PREFIX = '/api/';
const PROD_MODE_URL_PREFIX = './api/';
const ENV = process.env.NODE_ENV;

function getService(relativeUrl, options) {

    return dataService(relativeUrl, options);
}

function postService(relativeUrl, dataToPost, options) {
    return dataService(relativeUrl, options, dataToPost);
}

function dataService(relativeUrl, options, dataToPost) {
    /**
     * dataToPost = {
     *  key: value
     * } || string
     * options = {
     *  actions: {
     *    requestAction: function ()
     *    successAction: function (response)
     *    failureAction: function (error)
     *  },
     *  shouldRequest: function (state)
     * }
     */
    return (dispatch, getState) => {
        let url;
        const {requestAction, successAction, failureAction} = options.actions;
        if (relativeUrl.match(/json/)) {
            url = relativeUrl;
        } else {
            if (relativeUrl[0] === '/') {
                relativeUrl = relativeUrl.slice(1);
            }
            if (relativeUrl[relativeUrl.length - 1] !== '/') {
                relativeUrl += '/';
            }
            if (ENV !== 'production') {
                url = DEV_MODE_URL_PREFIX + relativeUrl;
            } else {
                url = PROD_MODE_URL_PREFIX + relativeUrl;
            }
        }

        if (options.shouldRequest(getState())) {
            let promise;
            const data = typeof dataToPost === 'string' ? {'data': dataToPost} : dataToPost;
            dispatch(requestAction());
            promise = dataToPost ? axios.post(url, data, {withCredentials: true}) : axios.get(url, {withCredentials: true});
            return promise
                .then(response => {
                    if (response.status === 200) {
                        return dispatch(successAction(response, dispatch));
                    }
                    return Promise.reject(response);
                })
                .catch(function (error) {
                    return dispatch(failureAction(error));
                });
        } else {
            return Promise.reject('FETCHING');
        }
    };
}

export {
    getService,
    postService,
};