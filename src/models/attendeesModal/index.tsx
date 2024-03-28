import Modal from 'antd/es/modal/Modal';
import { icons } from '../../constant/reacticonConstant/index';
import { Button, Input, Checkbox } from 'antd';
import { useState} from 'react';
import { EmploeenameidType, attendeModeltype } from '../../type';

import { searchBoxStyle,checkboxItemBoxStyle,profileIconStyle,ebItemBoxStyle,ebHeaderStyle,sbListStyle,sbItemBoxStyle,sbHeaderStyle,selectionBoxStyle,employeeBoxStyle } from '../../style/cssproperties';
import './index.scss';



const AttendeesModal = ({
  empnameid,
  isattendeesModal,
  setattendeesModal,
  setemaildata,
  emaildata
}: attendeModeltype) => {
 
  const [searchvalue, setsearchvalue] = useState<string>('');

  const handlecheck = (email: string) => {
    setemaildata((prevEmailData) => {
      let updatedEmailData;
      if (prevEmailData.includes(email)) {
        updatedEmailData = prevEmailData.filter((e) => e !== email);
      } else {
        updatedEmailData = [...prevEmailData, email];
      }
      return updatedEmailData;
    });
  };
  const searchemployeeindata =
    empnameid &&
    empnameid.filter((n) =>
      n.name.toLowerCase().includes(searchvalue.toLowerCase())
    );

  const handleOk = () => {
    setattendeesModal(false);
  };

  const handleCancel = () => {
    setattendeesModal(false);
  };

  return (
    <Modal
      open={isattendeesModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={450}
      footer={
        <Button key='ok' type='primary' onClick={handleOk} className='button'>
          {' '}
          Confirm
        </Button>
      }
      className='attendies'
    >
      <Input
        style={searchBoxStyle}
        placeholder='Search ....'
        value={searchvalue}
        onChange={(e) => setsearchvalue(e.target.value)}
      />
      {emaildata.length > 0 && (
        <div style={selectionBoxStyle}>
          <h2 style={sbHeaderStyle}>Selected</h2>
          <div style={sbItemBoxStyle}>
            {emaildata.map((email: string, index: number) => {
              return (
                <div key={index} style={sbListStyle}>
                  <icons.IoPersonCircleSharp style={profileIconStyle} />
                  <p style={{ alignSelf: 'center' }}>{email}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={employeeBoxStyle}>
        <h2 style={ebHeaderStyle}>Employee List</h2>
        <div style={ebItemBoxStyle}>
          {searchemployeeindata?.map(
            (emp: EmploeenameidType, index: number) => {
              return (
                <Checkbox
                  key={index}
                  checked={emaildata.includes(emp?.email)}
                  onChange={(e) => handlecheck(emp?.email)}
                >
                  <div style={checkboxItemBoxStyle}>
                    <icons.IoPersonCircleSharp style={profileIconStyle} />
                    <div>
                      <p>{emp?.name}</p>
                      <p>{emp?.email}</p>
                    </div>
                  </div>
                </Checkbox>
              );
            }
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AttendeesModal;
