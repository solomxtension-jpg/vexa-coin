async function approveWithdraw(id){

await db
.from("withdrawals")
.update({status:"approved"})
.eq("id",id)

alert("Approved")

}

async function rejectWithdraw(id){

await db
.from("withdrawals")
.update({status:"rejected"})
.eq("id",id)

alert("Rejected")

}
