async function loadReferrals(){

let {data} = await db
.from("users")
.select("email")
.eq("referred_by",user.refcode)

refUsers.innerHTML=""

data.forEach(u=>{

refUsers.innerHTML+=`
<tr>
<td>${u.email}</td>
</tr>
`

})

}
