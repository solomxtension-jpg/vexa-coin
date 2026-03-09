async function startMining(){

let now = new Date()

let {data:userData} = await db
.from("users")
.select("last_mine")
.eq("id",user.id)
.single()

if(userData.last_mine){

let diff = (now - new Date(userData.last_mine))/1000

if(diff < 86400){
alert("Mining already active")
return
}

}

await db
.from("users")
.update({
last_mine:now
})
.eq("id",user.id)

alert("Mining started")

}
