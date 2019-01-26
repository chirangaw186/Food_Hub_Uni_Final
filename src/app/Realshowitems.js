

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import './additemCSS.css';
import jwt_decode from 'jwt-decode';


export class Realshowitems extends React.Component {

constructor(props){
    super(props);
    this.state = {
     item: [],
     imagepreviewurl:"",
     currentID:"",
     shopid: this.props.match.params.id
     
    };

    //this.getItemID=this.getItemID.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
}




componentDidMount(){
   
    fetch('http://localhost:3000/reg/retrieve/'+this.state.shopid)
     .then(response => response.json())

    .then((res) => {
        console.log(res);   
        console.log(res.length);
        this.setState({
          
           item:res
       });
       //console.log(this.state.item);
    })
   

};

// getItemID(key){
//     console.log(key)
    
// }
editItem(key){
  console.log(key);
 // this.props.history.push('/edit/${item.itemid}')
  // const food ={
    
  //     itemid: key
     
  //   }
   
  //       fetch('http://localhost:4000/index/deletef',{
  //         method:"POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body:JSON.stringify(food)
  //       })
  //       .then(function(response){ 
  //         return response.json();   
  //        })
  //        .then(function(data){ 
           
  //        console.log(data)
  //        });
  
}
additems()
 {
   this.props.history.push("/additems/"+jwt_decode(localStorage.Token).details[0].shop_id)
 }




deleteItem(key){
    console.log(key);

    const food ={
      
        itemid: key
       
      }
     
          fetch('http://localhost:3000/reg/deletef',{
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(food)
          })
          .then(function(response){ 
            return response.json();   
           })
           .then(function(data){ 
             
              window.alert("Food Item Deleted Successfully!")
           });
    
}



render() {



   
return (
    // <div className="container">
    //     <div>
    //         <hr/>
    //        <h2>Food Items</h2>
    //        <br />
    //        <br />
    //         <ul className="unorder">{this.state.item.map(item => <li key={item.id}>{item.itemname}
    //         <ul><li>Item ID: {item.itemid}</li></ul>
    //         <ul><li>Available Quantity : {item.qty}</li></ul>
    //         <ul><li>Price : {item.price}</li></ul>
    //         </li>)}</ul>
                
           
    //     </div>
    // </div>


<div className="container" >

<hr/>
    <h2>My Food Items</h2>
        
    <hr/>
                   <button type="button" class="btn btn-danger btn-sm"  onClick={this.additems.bind(this)} >
              <span class="glyphicon glyphicon-plus"></span> Add Food Items
                 </button> 
                 
{this.state.item.map((item) => <div key={item.id}>  
    <br/>
    <div style={{backgroundColor:"#FFF0F5" }}>
    <div className="form-group" >
      <label className="col-lg-3 control-label">Item ID:</label>
      <div className="col-lg-8">
      <input className="form-control" type="text" value={item.itemid} />
      </div>
    </div>
 
    <div className="form-group">
      <label className="col-lg-3 control-label">Item name:</label>
      <div className="col-lg-8">
      <input className="form-control" type="text" value={item.itemname}/>
      </div>
    </div>

    <div className="form-group">
          <label className="col-lg-3 control-label">Price (Rs):</label>
      <div className="col-lg-8">
      <input className="form-control" type="text" value={item.price}/>
      </div>
      </div>

        <div class="form-group">
          <label className="col-lg-3 control-label">Available Quantity:</label>
      <div className="col-lg-8">
      <input className="form-control" type="text" value={item.qty}/>
      </div>
      </div>

      <div className="form-group">
      <label className="col-lg-3 control-label">Description:</label>
      <div className="col-lg-8">
      <input className="form-control" type="text" value={item.description}/>
      </div>
    </div>  


     

      <div className="form-group">
      <label className="col-md-3 control-label"></label>

          {/* <Link to={`/edit/${item.itemid}`} activeClassName="current" className="btn btn-info btn-sm">Edit Item</Link> */}
          <Link to={`/edititems/${item.itemid}`}  className="btn btn-info btn-sm">Edit Item</Link>

            
      
             <button type="button" className="btn btn-danger btn-sm" style={{margin:"20px" }} onClick={() =>this.deleteItem(item.itemid)}>
                <span className="glyphicon glyphicon-trash"></span> Delete this item
             </button> 

            </div>

            <div  style={{textAlign:"center",margin:"5px 15px",height:"300px",width:"300px",borderLeft:" 1px solid gray",borderRight:" 1px solid gray",borderTop:"5px solid gray",borderBottom:"5px solid gray"}}>
                   <img style={{width:"100%",height:"100%" }} src={item.imagepath} alt="Please select an image to preview"/> 
            </div>
            </div>
     </div>
     )}
    
    
 </div>
);
}
}
