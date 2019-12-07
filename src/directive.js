//指令
Vue.directive(
    "drag",
    function (el, binding) {
       
        el.onmousedown = function (e) {
            //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
            
            var divx = e.clientX - document.getElementById('drag').offsetLeft;
            var divy = e.clientY - document.getElementById('drag').offsetTop;
            document.getElementById('drag').style.transition = 0 + 's';
            //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
            document.onmousemove = function (e) {
                //获取移动后div的位置：鼠标位置-divx/divy
                var l = e.clientX - divx;
                var t = e.clientY - divy;
                document.getElementById('drag').style.left = l + 'px';
                document.getElementById('drag').style.top = t + 'px';
            }
            document.onmouseup = function (e) {
                setTimeout(() => {
                    document.getElementById('drag').style.left = 1 + 'px';
                }, 200);
                document.getElementById('drag').style.transition = 0.5 + 's';
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    },
)
