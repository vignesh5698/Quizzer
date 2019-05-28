var answer_array=[];

function landing_page(){
    var ques=new Array();
    var request=new XMLHttpRequest();
    request.open('GET','https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple','true');
    request.onload=function(){
        var data = JSON.parse(this.response);
        var num=0
        //Questions
        for(num=0;num<data.results.length;num++){
            ques[num]=data.results[num].question;
        }
        //HTML Content
        html_content="<h1>Quiz Of The Day</h1>";
        html_content+="<div>";
        html_content+="<div>";
        var i;
        for(i=0;i<10;i++){  
            var ans=[];
            var answer=[];
            answer_array.push(data.results[i].correct_answer);
            ans.push(data.results[i].correct_answer);
            wrong=data.results[i].incorrect_answers;
            answer=ans.concat(wrong);
            //Shuffle 4 options
            answer.sort(function(){
                return 0.5 - Math.random()
            });
            html_content+='<textarea>'+ques[i]+'</textarea>'
            html_content+="</div><br>"
            var j=0
            for(j=0;j<4;j++){
                html_content+="<div id='ans'>"
                html_content+='<input type= \'radio\' name=\'group_'+i+'\' value=\''+answer[j] +'\'>'+answer[j]+'<br><br>'
                html_content+="</div>"
            }            
        }
        html_content+="<br><br><div align='center'>"
        html_content+="<button value='Submit' id='btnSubmit' class='btnSubmit' onclick='funCalc() '>Submit Answer</button>"
        html_content+="</div>"
        html_content+="<p id='result'></p>"
        html_content+="</div>"
        document.getElementById('content').innerHTML = html_content;

    }
    request.send();

}

// $("#btnSubmit").click(function(){
//     alert("score")
    
//     $("#result").text("Your Score is "+count);
//     //$("p").show();
// });
function funCalc(){
    user_ans=[];
    count=0;
    for(x=0;x<10;x++){
        var radioVal=$("input[name=\'group_"+x+"']:checked").val();
        user_ans.push(radioVal);
    }
    for(x=0;x<10;x++){
        console.log(user_ans[x]+"  -  "+answer_array[x]);
        var str=user_ans[x]+"";
        var n=str.localeCompare(answer_array[x]);
        if(!n){
            count+=1;
        }
    }
    document.getElementById('result').innerHTML="Your Score is "+count;
    alert("Your Score is : "+count)
}
// onclick='funCalc()