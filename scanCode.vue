<template>
	<div class="scanCode">
		<video id="video" :controls="false"></video>
		<canvas id="canvas" class="canvas" canvas-id="canvas" type="2d"></canvas>
		<!-- <image :src="url" mode=""></image> -->
	</div>
	
</template>
<script>
	let { qrcode } = require('../../utils/reqrcode.js')
	export default {
		data() {
			return {
				videoEl: null,
				video: null,
				canvas: null,
				context: null,
				timer: null,
				url: ''
			}
		},
		methods: {
			// 初始化摄像头
			initCamera() {
				this.videoEl = document.getElementById('video')
				this.video = document.getElementsByTagName('video')[0];
				console.log(this.video)
				// this.video = document.getElementById('video')
				this.canvas = document.getElementsByTagName('canvas')[0];
				this.context = this.canvas.getContext('2d')
				
				// console.log(this.context.drawImage)
				
				if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia || navigator
					.webkitGetUserMedia || navigator.mozGetUserMedia) {
					//调用用户媒体设备, 访问摄像头
					this.getUserMedia({
						video: {
							width: 360,
							height: 240,
							facingMode: "environment"
						}
					}, this.success, this.error);
				} else {
					alert('不支持访问用户媒体');
				}
			},
			//访问用户媒体设备的兼容方法
			getUserMedia(constraints, success, error) {
				if (navigator.mediaDevices.getUserMedia) {
					//最新的标准API
					navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
				} else if (navigator.webkitGetUserMedia) {
					//webkit核心浏览器
					navigator.webkitGetUserMedia(constraints, success, error)
				} else if (navigator.mozGetUserMedia) {
					//firfox浏览器
					navigator.mozGetUserMedia(constraints, success, error);
				} else if (navigator.getUserMedia) {
					//旧版API
					navigator.getUserMedia(constraints, success, error);
				}
			},
			success(stream) {
				//兼容webkit核心浏览器
				let CompatibleURL = window.URL || window.webkitURL;
				//将视频流设置为video元素的源
				console.log(stream);
			
				//video.src = CompatibleURL.createObjectURL(stream);
				this.video.srcObject = stream;
				this.video.play();
				
				this.timer = setInterval(() => {
					this.canvasToBlob()
					// this.convertToImage(this.videoEl)
				}, 500)
			},
			error(error) {
				alert(`访问用户媒体设备失败${error.name}, ${error.message}`)
			},
			getObjectURL(file) {
				var url = null
				if (window.createObjectURL !== undefined) { // basic
					url = window.createObjectURL(file)
				} else if (window.URL !== undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file)
				} else if (window.webkitURL !== undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file)
				}
				return url
			},
			decodeStr(str) {
				var out, i, len, c;
				var char2, char3;
				out = "";
				len = str.length;
				i = 0;
				while (i < len) {
					c = str.charCodeAt(i++);
					switch (c >> 4) {
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							// 0xxxxxxx
							out += str.charAt(i - 1);
							break;
						case 12:
						case 13:
							// 110x xxxx 10xx xxxx
							char2 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
							break;
						case 14:
							// 1110 xxxx 10xx xxxx 10xx xxxx
							char2 = str.charCodeAt(i++);
							char3 = str.charCodeAt(i++);
							out += String.fromCharCode(((c & 0x0F) << 12) |
								((char2 & 0x3F) << 6) |
								((char3 & 0x3F) << 0));
							break;
					}
				}
				return out;
			},
			canvasToBlob() {
				const _width = this.videoEl.offsetWidth;
				const _height = this.videoEl.offsetHeight;
				const eventChannel = this.getOpenerEventChannel();
				this.context.drawImage(this.video, 0, 0, _width, _height);
				const $this = this
				this.canvas.toBlob(
					blob => {
						qrcode.decode(this.getObjectURL(blob))
						qrcode.callback = (codeRes) => {
							if (codeRes.indexOf('error') >= 0) {
								// alert("失败")
								console.log("失败")
							} else {
								// 二维码识别成功
								console.log('成功')
								let r = $this.decodeStr(codeRes)
								// this.qrCodeRes = r
								clearInterval($this.timer)
								// window.open(r)
								// window.location.href = r
								eventChannel.emit('acceptDataFromOpenedPage', r);
								uni.navigateBack()
							}
						}
					}
				)
			},
			
		},
		onShow() {
			this.$nextTick(() => {
				this.initCamera()
			})
		},
		onHide() {
			clearInterval(this.timer)
		},
		destroyed() {
			clearInterval(this.timer)
		}
	}
</script>
<style scoped lang="less">
	.scanCode{
		text-align: center;
		width: 100%;
		height: calc(100vh - 44px);
		overflow: hidden;
		#video{
			width: 100%;
			height: 100%;
		}
		.canvas{
			width: 100%;
			height: 100%;
		}
	}
</style>