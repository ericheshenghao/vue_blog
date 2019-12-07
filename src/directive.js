//指令
Vue.directive(
    "drag",
    function (el, binding) {

        el.onmousedown = function (e) {

            var divx = e.clientX
            var divy = e.clientY

            //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
            var layx = e.layerX
            var layy = e.layerY
            el.style.transition = 0 + 's';
            document.onmousemove = function (e) {
                //获取移动后div的位置：鼠标位置-divx/divy

                var l = e.clientX - layx
                var t = e.clientY - layy

                el.style.left = l + 'px';
                el.style.top = t + 'px';
            }
            document.onmouseup = function (e) {
                if (binding.value == "left") {
                    setTimeout(() => {
                        el.style.left = 1 + 'px';
                    }, 200);
                }

                el.style.transition = 1 + 's';
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    },
)
