// import React, {useEffect, useState} from "react"
import { v4 as uuidv4 } from 'uuid';
import { Animatedmessage } from '../components/animatedAlert/alertHook';

var items: any = []

let Calert = new Animatedmessage;

interface passedProps {
  data?: string | object
}

function getDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  
  const month = months[now.getMonth()];
  const day = now.getDate();

  return `${month} ${day}`;
}


export const AddToCart = (itmArr :any[], item: any) => {
  const myUuid = uuidv4();
  let OlditemsArr = itmArr;
  
  OlditemsArr.push({id: item.id, name: item.name, price: item.price, image: item.url, amount: 1, date: getDate(), Details: item.details, list: item.list})
  
  let newitemsArr = OlditemsArr;
  localStorage.setItem("cartItems", JSON.stringify(newitemsArr));
  // console.log("added new")
  cTar()
  Calert.alertNew("added new item", "success")
  

}

export function cTar() {
  if ('cartItems' in localStorage){

    let ct: any = localStorage.getItem("cartItems");
    ct = JSON.parse(ct)
    return ct
  }

}



export class WebStorage {
  // item: any;
  isDisabled = false;
  // ct = JSON.parse(`[${localStorage.getItem('cartItems')}]`);

  validate() {
    if ('cartItems' in localStorage) {
      this.isDisabled = true
    } else {
      localStorage.setItem("cartItems", JSON.stringify(items))
      try {
        console.log(" cart created successfully",)
        this.isDisabled = true;
        console.log(this.isDisabled)

      } catch (error) {
        console.log("failed to create cart")
      }
    }
  }



  add(item: any, itt:any) {
    !this.isDisabled ?
      AddToCart(item, itt)
      : console.log("your cart has not been validated")
  }

  remove(itemsArr: any[], id: string) {
    let OlditemsArr = itemsArr;
    for (let index = 0; index < OlditemsArr.length; index++) {
      if (OlditemsArr[index].id === id) {
        OlditemsArr.splice(index, 1)
      }
    }

    let newarr = OlditemsArr;
    // console.log(newarr)
    localStorage.setItem("cartItems", JSON.stringify(newarr));
    cTar()
    // location.reload()
  }

  increment(itemsArr: any[], id: string) {
    let OlditemsArr = itemsArr;
    for (let index = 0; index < OlditemsArr.length; index++) {
      if (OlditemsArr[index].id === id) {
        OlditemsArr[index].amount++
      }
    }

    let newarr = OlditemsArr;
    // console.log(newarr)
    localStorage.setItem("cartItems", JSON.stringify(newarr));
    cTar()
    // location.reload()
  }

  decrement(itemsArr: any[], id: string) {
    let OlditemsArr = itemsArr;
    for (let index = 0; index < OlditemsArr.length; index++) {
      if (OlditemsArr[index].id === id) {
        OlditemsArr[index].amount--
      }
    }

    let newarr = OlditemsArr;
    // console.log(newarr)
    localStorage.setItem("cartItems", JSON.stringify(newarr));
    cTar()
    // location.reload()
  }



}


