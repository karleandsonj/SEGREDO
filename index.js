$(function() {
    /*make the master div has a static height to prevent it from disppearing while the master img is feading in,
    this step is important if you use a fadeIn duration for the master img more than 1s, but if you use a duration less than 1s
    you don't need to make the height of the master div is static, and it is preferred to make the duration less than 1s to prevent the
    user to choose 2 images at the same time, so the implementation of the code will be faster than the user selection*/
    $(".master").css({
        height: $(".master img").height() + 13
    });

    //make the width of the thumbnails images is dynamic
    var imagesNumber        = $(".thumbnails").children().length,
        marginBetweenImages =  1,
        totalMargins        = marginBetweenImages * (imagesNumber - 1),
        imageWidth          = (100 - totalMargins) / (imagesNumber);
        
    $(".thumbnails img").css({
        width: imageWidth + "%",
        marginRight: marginBetweenImages + "%"
    });


    //remove the active class from all thumbnails images and add it to the selected one, then add this selected as the master image in the master div
    $(".thumbnails img").on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
        $(".master img").hide().attr("src", $(this).attr("src")).fadeIn(300);
    });


    //use the chevron left and right to select images and translate between them
    $(".master .fas").on("click", function() {
        if($(this).hasClass("fa-chevron-left")) {
            if($(".thumbnails img.active").is(":first-child")) {
                $(".thumbnails img:last-child").click();
            } else {
                $(".thumbnails img.active").prev().click();
            }
        } else {
            if($(".thumbnails img.active").is(":last-child")) {
                $(".thumbnails img:first-child").click();
            } else {
                $(".thumbnails img.active").next().click();
            }
        }
    })
})