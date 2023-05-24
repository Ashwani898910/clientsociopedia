import React from "react";


export const CommentCard = ({ data }) => {
    return (
        <div
            style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: '2rem auto ',
                gap: '0rem'
            }}>
            <div >
                <img
                    style={{ width: 30, height: 30, borderRadius: "50%", justifyItems: "center" }}
                    src={data.Data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.Data.image : ""}
                    alt=""
                />
            </div>
            <div>
                <span>
                    <b style={{ fontSize: "1rem" }}>{data.Data.visitor}</b><br />
                    {data.Data.message}
                </span>
                <hr style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }} />
            </div>

        </div>
    );


}
