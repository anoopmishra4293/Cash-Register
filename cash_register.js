function checkCashRegister(price, cash, cid) {
    // cid = cash in drawer
    var currencyUnit = {"PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1, "QUARTER": 0.25,	"ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100}
    let diff = cash - price
    let sum = 0
    for (let i=0; i<cid.length; i++) {
      sum = sum + cid[i][1]
    }
    if (sum < diff) {
      return {status: "INSUFFICIENT_FUNDS", change: []} 
    }
    if (sum == diff) {
      return {status: "CLOSED", change: cid}
    }
  
    let arr = Object.keys(currencyUnit)
    var ans = []
  
    for (let i=arr.length-1; i>=0; i--){
      if (currencyUnit[arr[i]]<=diff) {
        let key = arr[i] 
        let unitValue = currencyUnit[key]
        let total = cid[i][1]
        if (total<=diff) {
          diff = (diff - total).toFixed(2) 
          ans.push([key,total])
        } else {
          let x = Math.floor(diff/unitValue)
          ans.push([key,x*unitValue])
          diff = (diff-x*unitValue).toFixed(2) 
        }
        if (diff == 0) {
          break
        }
      }
  
    }
    let result
    if(diff==0){ result = {status: "OPEN", change: ans}}
    else{
      result={status: "INSUFFICIENT_FUNDS", change: []} 
    }
  
  
    return result;
  }
  
// 1.)   checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// 2.) checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])