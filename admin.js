async function loadUsers(){

let {data}=await db.from("users").select("email,coins")

adminUsers.innerHTML=""

data.forEach(u=>{

adminUsers.innerHTML+=`
<tr>
<td>${u.email}</td>
<td>${u.coins}</td>
</tr>
`

})

}
