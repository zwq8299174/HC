
export class BaseSet {
	baseUrl: string = 'http://139.224.230.6:19101';

}
/*----------------------------------------后台Api地址----------------------------------------*/
// export const APP_SERVE_URL = 'http://88.128.18.144:8081/api/';//闫小军
// export const APP_SERVE_URL = 'http://88.128.19.164:8081/api/';//马杰
export const APP_SERVE_URL = 'http://172.16.19.138:9020/api/';//测试
/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://172.16.19.86/kit_file_server/';//文件服务:测试环境
/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.86/version/api/';//新测试环境
export const IS_DEBUG = true;//是否开发(调试)模式
export const DEFAULT_AVATAR = './assets/img/avatar.png';//用户默认头像
export const PAGE_SIZE = 20;//默认分页大小
export const IMAGE_SIZE = 1024;//拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94;//图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000;//请求超时时间,单位为毫秒
export const FUNDEBUG_API_KEY = 'ae70ab78a87670b6ab40c85e205dc7d8571492bc19b275b6c5c59b5ef6bd9426';

//code push 部署key
export const CODE_PUSH_DEPLOYMENT_KEY = {
	'android': {
		'Production': 'UZQxbyb7XrhVrlsSVR4neEdS8isO65d837ac-83a7-46ac-b3f7-d9f5df69ca82',
		'Staging': 'aIRN0uy1JzfytGQUArqadYM5KR2a65d837ac-83a7-46ac-b3f7-d9f5df69ca82'
	},
	'ios': {
		'Production': 'Eh-iBdA2RR96ES4aqEHCDKbDjtJd65d837ac-83a7-46ac-b3f7-d9f5df69ca82',
		'Staging': '_xOFAISN8jE97almzPBmPfJBVp2y65d837ac-83a7-46ac-b3f7-d9f5df69ca82'
	}
};
