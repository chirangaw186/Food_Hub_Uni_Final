import React from 'react';
//import './additemCSS.css';

import FileBase64 from 'react-file-base64';

export class Additems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
   
            itemname: "Fried Rice",
            qty: 20,
            price: 100,
            selectedFile: null,
            loaded: 0,
            imagepath: [],
            file: '',
            imagepreviewurl: '',
            uploadstatus: false,
            files:null,
            description:'Add Description',
            shopid: this.props.match.params.id,


        };
        this.handleChange = this.handleChange.bind(this);
        
        this.onNameValueChange = this.onNameValueChange.bind(this);
        this.onQtyValueChange = this.onQtyValueChange.bind(this);
        this.onPriceValueChange = this.onPriceValueChange.bind(this);
        this.onDescriptionValueChange = this.onDescriptionValueChange.bind(this);
      
     
    }




    onNameValueChange(event) {
        event.preventDefault();
        this.setState({
            itemname: event.target.value
        });
    }
    onQtyValueChange(event) {
        event.preventDefault();
        this.setState({
            qty: event.target.value
        });
    }

    onPriceValueChange(event) {
        event.preventDefault();
        this.setState({
            price: event.target.value
        });
    }

    onDescriptionValueChange(event) {
        event.preventDefault();
        this.setState({
            description: event.target.value
        });
    }

   
    getFiles(files){
        this.setState({ files: files })
      }
    



    handleChange() {
        //console.log(this.state.files.base64);
        // const data = new FormData();
        // data.append('file',this.state.selectedFile);
            var myimage="alternate.jpg";
        if(this.state.files==null){
           console.log("inside if")
            
        }else{
           myimage=this.state.files.base64
        }

        const data = new FormData();
        data.append('myfile',myimage);
       
        data.append('itemname',this.state.itemname);
        data.append('qty',this.state.qty);
        data.append('price',this.state.price);
        data.append('description',this.state.description);
        data.append('shopid',this.state.shopid);
  
        fetch('http://localhost:3000/reg/newfood', {
            method: "POST",
           
           
            body:data   
        })
            .then(function (response) {

                return response.json();
            })
            .then((res) => {
                window.alert(res.message);
                window.location.reload();
            });

    }


    render() {

  





        return (
            <div className="container" >

                <form className="form-horizontal" onSubmit={this.onValueSubmit}>
                    <h2>Add Item</h2>
                    <br />
                    <br />

                  
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Item Name :</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="pwd" value={this.state.itemname} onChange={this.onNameValueChange} placeholder="Enter Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Available Quantity :</label>
                        <div className="col-sm-10">
                            <input type="Number" className="form-control" value={this.state.qty} onChange={this.onQtyValueChange} id="email" placeholder="Enter Available Quantity" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Price:</label>
                        <div className="col-sm-10">
                            <input type="Number" className="form-control" id="pwd" value={this.state.price} onChange={this.onPriceValueChange} placeholder="Enter Price" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" >Description:</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={this.state.description} onChange={this.onDescriptionValueChange} placeholder="Add Description" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-2" >Image:</label>
                        <div className="col-sm-10">
                            <FileBase64
                                multiple={false}
                                onDone={this.getFiles.bind(this)}
                               />

                        </div>
                    </div>

                  




                </form>
                <button className="btn btn-primary col-sm-2" id="subButton" onClick={this.handleChange}>Save</button>












            </div>
        );
    }
}