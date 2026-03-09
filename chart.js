new Chart(
document.getElementById("balanceChart"),
{
type:"line",
data:{
labels:["Mon","Tue","Wed","Thu","Fri"],
datasets:[{
label:"Balance Growth",
data:[0.5,1,2,3,4]
}]
}
}
)
