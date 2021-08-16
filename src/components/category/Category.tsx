/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { fetchCategories } from 'src/api/categoryAndSeries';
import { useRequest } from 'ahooks';
import type { ColumnType } from 'rc-table/lib/interface';
import { Space, Button, Table } from 'antd';
import type { CategoryT, CatetoryClientT } from 'src/@types/category';
import styles from './Category.module.scss';


const Category: FC<RouteComponentProps> = (props) => {
  const {
    match: { path },
  } = props;

  // 表格列定义
  const columns: ColumnType<any>[] = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text: string, record: Record<string, any>) => <Link to={`${path}/${record._id}`}>{text}</Link>,
    },
    {
      title: '系列数量',
      dataIndex: 'series_count',
      key: 'series_count',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: string, record: Record<string, any>) => (
        <Space size='small'>
          <Button className={styles['operation-btn']} type='link'>
            编辑
          </Button>
          <Button className={styles['operation-btn']} type='link'>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 获取所有商品
  const { data, loading: fetchCategoriesLoading } = useRequest(
    fetchCategories,
    {
      formatResult({ res }) {
        // 格式化接口返回的数据
        // console.log('formatResult => ', res);
        return res.map((item: CategoryT) => {
          const { _id: key, series_data } = item;
          return {
            ...item,
            key,
            series_count: series_data.length,
          };
        });
      },
    }
  );

  return (
    <div className={styles.container}>
      <h4>类别列表</h4>
      <Table
        size='middle'
        loading={fetchCategoriesLoading}
        columns={columns}
        dataSource={data as CategoryT[]}
      />
      {/*  <br />
      <Upload {...props2}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <br />
      <Image src='http://localhost:7031/upload/bootstrap.png' width={200} />
      <br />
      <Button onClick={() => addGoods(params)}>添加商品</Button>
      <br />
      <br />
      <Button onClick={() => editGoods(params2)}>
        修改商品：611149f98f66013b50690383
      </Button>
      <br />
      <br />
      <Button onClick={() => deleteGoods(params3)}>
        删除商品：611149f98f66013b50690383 & 4
      </Button>
      <div>{JSON.stringify(goods)}</div>
      <br />
      <hr /> */}
    </div>
  );
};

export default Category;
