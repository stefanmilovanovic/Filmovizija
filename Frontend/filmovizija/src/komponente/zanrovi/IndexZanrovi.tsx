import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";

export default function IndexZanrovi() {

  React.useEffect(()=>{
    axios.get(urlZanrovi).then(res=>{
        if(res.status===200) console.log(res.data);
    })
  },[])

  return (
    <>
      <div style={{ backgroundColor: "#D3F4FF" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-9">
              <h2>Žanrovi</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-dark" to="/zanrovi/dodaj">
                  Dodaj novi žanr
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    </>
  );
}
