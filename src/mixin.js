var myMixin = {
    created: function () {
        this.getHeight()

    },
    mounted() {

    },
    methods: {

        getHeight: function () {
            $(document).ready(function () {
                var p=0,t=0;  
                $(document).scroll(function () {
                    p = $(this).scrollTop();
                    if (t >= p) {
                        $("#backbt").removeClass("animated bounceOutDown");
                        $("#backbt").addClass("animated bounceInUp");
                       
                      } else {
                        $("#backbt").removeClass("animated bounceInUp");
                        $("#backbt").addClass("animated bounceOutDown");
                      }
                      setTimeout(function() {
                        t = p;
                      }, 0);
                    //开始监听滚动条
                    //获取当前滚动条高度
                    var max = $(document).height();
                    var top = $(document).scrollTop();
                    var viewH = $(window).height();
                    if (
                        document.body.scrollTop < max - viewH - 400 ||
                        document.documentElement.scrollTop < max - viewH - 400
                    ) {
                       
                        // $("#backbt").addClass("animated bounceInUp");
                    } 
                    //用于调试 弹出当前滚动条高度
                    var percentage = (top / (max - viewH)) * 100 + "%";
                    $(".el-progress-bar__inner").css("width", percentage);

                });

            });

        }
    }
}
export default myMixin