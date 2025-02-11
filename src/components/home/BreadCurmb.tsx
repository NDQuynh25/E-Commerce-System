import React from "react";
import { Breadcrumb } from "antd";


const BreadCurmb: React.FC = () => {
    return (
        <div className="bread-crumb" style={{width: '100%', height: '200px', marginBottom: '20px'}}>
            <div 
                className="bread-crumb__container" 
                style={{
                    height: '100%', 
                    background: "linear-gradient(0deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3)),  url(//bizweb.dktcdn.net/100/480/479/themes/900388/assets/breadcrumb.jpg?1727161994343) center no-repeat",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="" style={{color: '#fff', fontSize: '30px', fontWeight: 'bold', paddingBottom: '15px'}}>
                    Giới thiệu
                </div>
                <Breadcrumb
                    items={[
                        {
                        title: 'Trang chủ',
                        },
                        {
                        title: <a href="">Application Center</a>,
                        },
                        {
                        title: <a href="">Application List</a>,
                        },
                        {
                        title: 'An Application',
                        },
                    ]}
                >
                    
                </Breadcrumb>
            </div>
            
        </div>
    );
};
export default BreadCurmb;


{/* <section class="bread-crumb" style="background: ;">
	
	<div class="container">
		<div class="title-bread-crumb">
			Giới thiệu
		</div>
		<ul class="breadcrumb">					
			<li class="home">
				<a href="/"><span>Trang chủ</span></a>						
				<span class="mr_lr">&nbsp;<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg>&nbsp;</span>
			</li>
			
			<li><strong><span>Giới thiệu</span></strong></li>
			
		</ul>
	</div>
</section> */}