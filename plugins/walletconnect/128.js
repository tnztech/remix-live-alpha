"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[128],{16128:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{ccipFetch:()=>ccipFetch,offchainLookup:()=>offchainLookup,offchainLookupAbiItem:()=>offchainLookupAbiItem,offchainLookupSignature:()=>offchainLookupSignature});var call=__webpack_require__(68225);var stringify=__webpack_require__(44420);var base=__webpack_require__(61218);var utils=__webpack_require__(38844);class OffchainLookupError extends base.G{constructor({callbackSelector,cause,data,extraData,sender,urls}){super(cause.shortMessage||"An error occurred while fetching for an offchain result.",{cause,metaMessages:[...cause.metaMessages||[],cause.metaMessages?.length?"":[],"Offchain Gateway Call:",urls&&["  Gateway URL(s):",...urls.map((url=>`    ${(0,utils.Gr)(url)}`))],`  Sender: ${sender}`,`  Data: ${data}`,`  Callback selector: ${callbackSelector}`,`  Extra data: ${extraData}`].flat()});Object.defineProperty(this,"name",{enumerable:true,configurable:true,writable:true,value:"OffchainLookupError"})}}class OffchainLookupResponseMalformedError extends base.G{constructor({result,url}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,utils.Gr)(url)}`,`Response: ${(0,stringify.P)(result)}`]});Object.defineProperty(this,"name",{enumerable:true,configurable:true,writable:true,value:"OffchainLookupResponseMalformedError"})}}class OffchainLookupSenderMismatchError extends base.G{constructor({sender,to}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${to}`,`OffchainLookup sender address: ${sender}`]});Object.defineProperty(this,"name",{enumerable:true,configurable:true,writable:true,value:"OffchainLookupSenderMismatchError"})}}var request=__webpack_require__(26002);var decodeErrorResult=__webpack_require__(2564);var encodeAbiParameters=__webpack_require__(68244);var address=__webpack_require__(20471);var isAddress=__webpack_require__(79582);function isAddressEqual(a,b){if(!(0,isAddress.U)(a))throw new address.b({address:a});if(!(0,isAddress.U)(b))throw new address.b({address:b});return a.toLowerCase()===b.toLowerCase()}var concat=__webpack_require__(65957);var isHex=__webpack_require__(62497);const offchainLookupSignature="0x556f1830";const offchainLookupAbiItem={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function offchainLookup(client,{blockNumber,blockTag,data,to}){const{args}=(0,decodeErrorResult.p)({data,abi:[offchainLookupAbiItem]});const[sender,urls,callData,callbackSelector,extraData]=args;try{if(!isAddressEqual(to,sender))throw new OffchainLookupSenderMismatchError({sender,to});const result=await ccipFetch({data:callData,sender,urls});const{data:data_}=await(0,call.R)(client,{blockNumber,blockTag,data:(0,concat.zo)([callbackSelector,(0,encodeAbiParameters.E)([{type:"bytes"},{type:"bytes"}],[result,extraData])]),to});return data_}catch(err){throw new OffchainLookupError({callbackSelector,cause:err,data,extraData,sender,urls})}}async function ccipFetch({data,sender,urls}){let error=new Error("An unknown error occurred.");for(let i=0;i<urls.length;i++){const url=urls[i];const method=url.includes("{sender}")||url.includes("{data}")?"GET":"POST";const body=method==="POST"?{data,sender}:undefined;try{const response=await fetch(url.replace("{sender}",sender).replace("{data}",data),{body:JSON.stringify(body),method});let result;if(response.headers.get("Content-Type")?.startsWith("application/json")){result=(await response.json()).data}else{result=await response.text()}if(!response.ok){error=new request.Gg({body,details:(0,stringify.P)(result.error)||response.statusText,headers:response.headers,status:response.status,url});continue}if(!(0,isHex.v)(result)){error=new OffchainLookupResponseMalformedError({result,url});continue}return result}catch(err){error=new request.Gg({body,details:err.message,url})}}throw error}}}]);