import axios from 'axios'
import router from '@/router/index'
import cookies from 'js-cookie'

const CancelToken = axios.CancelToken;
export let cancelAxios = [];

axios.defaults.headers['ngrok-skip-browser-warning'] = 'any';

function AjaxDefine() {
  const ajax = {
    setAuthorization(token) {
      cookies.set('taiwantokan', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    getAuthorization() {
      let token = cookies.get('taiwantokan');
      token = (token) ? `Bearer ${token}` : '';
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
    },
    setAccountId(id) {
      axios.defaults.headers.common['accountId'] = id;
    },
    async baseConfig(options) {
      try {
        this.getAuthorization();
        const res = await axios(options);
        // for 權限過期或帳號錯誤
        if (res.data.errorCode === '35990011' || res.data.errorCode === '35990012') {
          //localStorage.removeItem('CDPWeb');
          router.push({ name: 'ErrorPage' });
        }
        if (res.data.errorCode === '999910001') {
          cookies.remove('taiwantokan');
          router.push({ name: 'Login' });
        }
        return res.data;
      } catch (error) {
        this.ErrorHandle(error);
        throw error;
      }
    },
    optionsMerge(method, path, param, options = {}) {
      const option = {
        method,
        url: path,
        data: param,
        cancelToken: new CancelToken(function executor(c) {
          cancelAxios.push(c);
        }),
        ...options,
      };
      return option;
    },
    get(path, options = {}) {
      return this.baseConfig(this.optionsMerge('get', path, null, options));
    },
    post(path, param, options = {}) {
      return this.baseConfig(this.optionsMerge('post', path, param, options));
    },
    put(path, param, options = {}) {
      return this.baseConfig(this.optionsMerge('put', path, param, options));
    },
    patch(path, param, options = {}) {
      return this.baseConfig(this.optionsMerge('patch', path, param, options));
    },
    delete(path, param, options = {}) {
      return this.baseConfig(this.optionsMerge('delete', path, param, options));
    },
    async all(ajaxArray = []) {
      try {
        const res = await axios.all(ajaxArray);
        return res;
      } catch (error) {
        this.ErrorHandle(error);
        throw error;
      }
    },
    ErrorHandle(error) {
      console.error(error);
      //console.log('import.meta.env.MODE', import.meta.env.MODE);
      // 注意: 302 這個是for第一次 POC 階段先這樣做,之後後端改變作法這邊再拿掉.
      /* if ((error.response && error.response.status === 302) || error.toString() === 'Error: Network Error') {
        if (import.meta.env.MODE !== 'development') {
          const text = '尚未授權或已登出，請重新登入';
          const callback = () => {
            window.location.href = '/sushiexpress/login';
          }
          alert(text);
          callback();
        }
      } */
      // 注意: 302 這個是for第一次 POC 階段先這樣做,之後後端改變作法這邊再拿掉.
      if (error.response && error.response.status === 401 && error.response.status === 302) {
        const text = '尚未授權或已登出，請重新登入';
        const callback = () => {
          //cookies.remove('taiwantokan', { domain: '.justka.ai' });
          router.push({ name: 'Login' });
        }
        alert(text);
        callback();
      }
    },
    checkErrorCode(backCode, checkCode = '996600001') {
      return backCode === checkCode;
    },
    cancelAllCancelToken() {
      cancelAxios.forEach((item) => item());
      cancelAxios = [];
    }
  }

  return ajax
}

export const ajax = AjaxDefine()
