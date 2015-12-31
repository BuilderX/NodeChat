/**
 * Created by Rook on 11/3/2015.
 */



$(document).ready(function() {

    jQuery.noConflict();
$("span:nth-child(1)").mouseover(function() {
    $("#selector").animate({"left":"0.1%"},200);
});
$("span:nth-child(2)").mouseover(function() {
    $("#selector").animate({"left":"17.7%"},200);
});
$("span:nth-child(3)").mouseover(function() {
    $("#selector").animate({"left":"33.1%"},20);
});
$("span:nth-child(4)").mouseover(function() {
    $("#selector").animate({"left":"53%"},200);
});
$("span:nth-child(5)").mouseover(function() {
    $("#selector").animate({"left":"71.9%"},200);
});
$("span:nth-child(6)").mouseover(function() {
    $("#selector").animate({"left":"95.7%"},200);
});
    //Your jQuery code goes here....
});

