/**
 * Created by kimberlyvasquez on 12/29/15.

document.ready(function(){
    "use strict";

    $('div .-back-pulse').hide();
    //$(id') $('.myclass') $('table);
    $('div').onclick('button').alert();
    //,function(){
      //      $('p').hide().tooltip.apply(this);
        $("#clickme").click(function(){
            $("#book").animated({
                opacity:0.25,
                left:"+=50",
                height:"toggle"


            },5000,function(){

            });


        });



//});

$("#clickme").click(function(){
    "use strict";
    $("#book").animate({
        width:"toggle",
        height:"toggle"


    }, {duration:5000,
        specialEasing:{
        width:"linear",
        height:"easeOutBounce"
        },

        complete:function(){

        $(this).after("<div> Animation Complete</div>");

            }
    });


});






var arr = [];

$.each(arr, function(index,value){
    "use strict";
    console.log(index,value);

});

*/



var Norms = { name:"Norm1", attack:4,def:0.1,hitPoints:10,
        min:2,max:4.5,
        tweak:function(){
        "use strict";

            this.attack = Math.random() * this.max - this.min + this.min ;
            this.def =  Math.random() * this.max - this.min  + this.min ;
            this.hitPoints = Math.random() * this.max - this.min + this.min ;

            console.log(this.attack + " " + this.def + " " + this.hitPoints);


    }
};

var Warrior = { name:"", attack:24,def:10.1,hitPoints:110
        ,create:function(name, attack, def, hitPoints) {
        var obj = Object.create(name, attack, def, hitPoints);
        this.name = name;
        this.attack = attack;
        this.def = def;
        this.hitPoints = hitPoints;

        return obj;
    }

};
var AlienBoss = { name:"", attack:14,def:20.1,hitPoints:210
        ,create:function(name,attack,def,hitPoints){
        "use strict";
        var obj = Object.create(name,attack,def,hitPoints);
            this.name = name;
            this.attack = attack;
            this.def = def;
            this.hitPoints = hitPoints;

            return obj;

    }


};


var City = {
    NumOfBuildings:0,
    NumOB:function(){
        "use strict";
        return {
            get:function(){return this.NumOfBuildings;},
            set:function(NOB){this.NumOfBuildings = NOB;}

            }

        },
    bSet : function(Set){
            this.NumOB.set(Set);
    },

    bGet : function(){
            return this.NumOB.get();

    },
    buildingGenerator: function () {
        this.NumOfBuildings = this.NumOfBuildings + 4;
        //var syle = document.getElmentById("p").style.color;
        //syle = "red";
        var building;
        background = $('canvas').css(
            {"background": "Brown",
            "width": "100px",
            "height":"200px"
            ,"position":"absolute"});



    }
};

function loadCss(filetype,filename){
    "use strict";
            if(filetype=="css"){
                var  fileref = document.createElement(link);
                fileref.setAttribute("rel","stylesheet");
                fileref.setAttribute("type","text/css");
                fileref.setAttribute("href",filename);

            }if(typeof fileref!== "undefined"){
                         document.getElementsByTagName("head")[0].append(fileref);
    }


}
Norms.tweak();



