import {imageConst} from '../imageConstant/index'
export const confirbooking={
    success:{
        icon:<img src={imageConst.sucessImg} alt='success' width={110} ></img>,
        shortdes:'Yoohoo!',
        longdes:
"Your booking request has been sent. Updates will be emailed."     },
    failed:{
       icon:<img src={imageConst.failureImg} alt='failure'width={110} ></img>,
       shortdes:'Oops!',
       longdes:'Unable to Send Request to the administrator',
    },
}