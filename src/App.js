import React from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';;

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataFecthing = async () => {
      try {
        const DataResponse = await axios.post("https://v1.tenants.authnull.com/tenantlist",
          {
            email: "muthudurai1011@gmail.com"
          });
        setData(DataResponse.data.data)
        console.log(DataResponse.data);
      } catch (error) {
        console.log(error)
      }
    }
    dataFecthing();
  }, []);

  const dateFormater = () => {
    return moment().utc().utcOffset("+05:30").format("DD-MM-YYYY, h:mm A [IST]");
  }
  const camelCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'tenant_name',
      key: 'tenant_name',
    },
    {
      title: 'Admin Email',
      dataIndex: 'admin_email',
      key: 'admin_email',
      render: (text) => <Tag style={{ color: 'green' }} >{text}</Tag>,
    },
    {
      title: 'Tenant URL',
      dataIndex: 'site_url',
      key: 'site_url',
      render: (text) => <span style={{ color: 'blue' }} >{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => camelCase(text)
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => dateFormater(text)
    },

    {
      title: 'Modified At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => dateFormater(text)
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <MoreOutlined />
        </Space>
      ),
    },

  ];

  return (
    <div className="App">
      <h2 className='h1'>Tenant</h2>
      <Button className='btn' type="primary" htmlType="submit">
        Create Tenant
      </Button>
      <label className='label'>search</label><br></br>
      <Input className='input' placeholder='search'></Input><br></br><br></br>
      <Table className='table' dataSource={data} columns={columns} />

    </div>
  );
}

export default App;
// YYYY-MM-DD