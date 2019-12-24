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
                scroll: ""
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
                        }, 100);

                    };



                    p = $(this).scrollTop();
                    if (t >= p) {
                        try{
                        if ($("#backbt").attr("class").indexOf("zoomOutUp") != -1) {
                            $("#backbt").removeClass("animated zoomOutUp");
                            $("#backbt").addClass("animated fadeIn");
                            
                        }}catch{
                            return
                        }


                    } else {
                        try{
                        if ($("#backbt").attr("class").indexOf("zoomOutUp") == -1) {
                            
                            $("#backbt").removeClass("animated fadeIn");
                            $("#backbt").addClass("animated zoomOutUp");
                        }}catch{
                            return
                        }
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

                    }

                   

                    if (
                        document.body.scrollTop > 450 ||
                        document.documentElement.scrollTop > 450
                    ) {

                        //   $(".table-of-contents").offset({ top: document.documentElement.scrollTop });
                        // $(".table-of-contents").css("top",document.documentElement.scrollTop-450+"px");
                        try {
                            if ($(".table-of-contents").attr("class").indexOf("fadeInDown") == -1) {
                                $(".table-of-contents").removeClass("animated fadeInUp");
                                $(".table-of-contents").addClass("scroll animated fadeInDown");
                            }
                        } catch{
                            return
                        }

                        // window.addEventListener('scroll', debounce(scrollFunc, 0));
                        // $(".table-of-contents").removeClass("animated hinge");
                    } else {
                        try {
                            if ($(".table-of-contents").attr("class").indexOf("fadeInUp") == -1) {
                                $(".table-of-contents").removeClass("scroll animated fadeInDown");
                                $(".table-of-contents").addClass("animated fadeInUp");
                            }
                        } catch{
                            return
                        }

                        // window.removeEventListener('scroll', debounce(scrollFunc));

                    }

                    if ((top / (max - viewH)) * 100 > 96) {
                        $(".table-of-contents").addClass("showoff");

                    } else {
                        $(".table-of-contents").removeClass("showoff");

                    }

                    if ((top / (max - viewH)) * 100 > 88 || (top / (max - viewH)) * 100 < 18) {


                        if ($(".footbar").attr("class").indexOf("fadeInUp") != -1) {
                            $(".footbar").removeClass("animated fadeInUp")
                            $(".footbar").addClass("showoff");


                        }

                    } else {
                        if ($(".footbar").attr("class").indexOf("fadeInUp") == -1) {
                            $(".footbar").removeClass("showoff");
                            $(".footbar").addClass("animated fadeInUp")


                        }
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