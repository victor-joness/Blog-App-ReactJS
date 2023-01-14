import React from "react"
import {Link} from "react-router-dom"

import Menu from "../../Components/Menu/Menu"

import "./Single.css"


import Edit from "../../img/edit.png"
import Delete from "../../img/delete.png"

const Single = () => {
    return(
        <div className="single">
            <div className="content">
                <img src="https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <div className="user">
                    <img src="https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    <div className="infos">
                        <span>John</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={Edit} alt="" />
                        </Link>
                        <img src={Delete} alt="" />
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit nt recusandae!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eligendi fuga omnis laudantium? Ut a iste sequi molestias numquam quos illo, non, aspernatur possimus quae similique, ipsa illum aliquid exercitationem. <br /> <br /> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem tempora quia nostrum ad perspiciatis voluptatum, iusto debitis enim ea aperiam deserunt, sunt laborum expedita blanditiis fugit ex minus! Facilis, corrupti?Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, inventore aliquam. Iure et commodi ipsam ad recusandae pariatur sapiente perspiciatis delectus cum esse neque aperiam incidunt, fuga corporis earum illum?</p>
            </div>
            <Menu/>
        </div>
    );
};

export default Single;