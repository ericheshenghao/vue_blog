var myMixin = {
    created: function () {
        this.getHeight()

    },
    mounted() {

    },
    watch: {
        "$route": function () {

            window.scrollTo(0, 0);


        },
        data() {
            return {
                scroll:""
            }
        }

    },
    methods: {

        getHeight: function () {

            $(document).ready(function () {
                var p = 0, t = 0;

                $(document).scroll(function () {

                    var scroll = document.documentElement.scrollTop
                    this.scroll = scroll

                    // 简单的防抖动函数
                    function debounce(cb, waitTime) {
                        let last = 0;
                        const now = new Date().getTime();
                        if (now - last < waitTime) return;
                        last = now;

                        setTimeout(() => {
                            cb();
                        }, 0);

                    };



                    p = $(this).scrollTop();
                    if (t >= p) {
                        $("#backbt").removeClass("animated zoomOutUp");
                        $("#backbt").addClass("animated fadeIn");

                    } else {
                        $("#backbt").removeClass("animated fadeIn");
                        $("#backbt").addClass("animated zoomOutUp");
                    }
                    setTimeout(function () {
                        t = p;
                    }, 0);
                    //开始监听滚动条
                    //获取当前滚动条高度
                    var max = $(document).height();
                    var top = $(document).scrollTop();
                    var viewH = $(window).height();


                    function scrollFunc() {
                        // 滚动中的真正的操作
                        if (document.documentElement.scrollTop > 450
                        ) {
                            $(".table-of-contents").css("top", document.documentElement.scrollTop - 400 + "px");
                        } else {
                            $(".table-of-contents").css("top", 0 + "px");
                        }
                    }

                    if (
                        document.body.scrollTop > 450 ||
                        document.documentElement.scrollTop > 450
                    ) {

                        //   $(".table-of-contents").offset({ top: document.documentElement.scrollTop });
                        // $(".table-of-contents").css("top",document.documentElement.scrollTop-450+"px");


                        $(".table-of-contents").addClass("scroll");
                        // window.addEventListener('scroll', debounce(scrollFunc, 0));

                    } else {
                        $(".table-of-contents").removeClass("scroll");
                        // window.removeEventListener('scroll', debounce(scrollFunc));

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