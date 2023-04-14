import React, { useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Form, Input, Card, InputNumber, notification, Skeleton, Tag, Space } from 'antd';
import { donate } from "services/donate"
import { useCampaign } from "services/campaign"

const Campaign = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {status, data, error, isFetching} = useCampaign(id);
  const [donateLoading, setDonateLoading] = useState(false);

  const onFinish = async (data) => {
    setDonateLoading(true);
    donate({data, id}).then(() => {
      notification["success"]({
        description: "Thank you for your donation!",
        duration: 5
      })
      navigate("/")
    }).catch(e => {
      notification["error"]({
        description: e.response.message,
        duration: 5
      })
    }).finally(() => {
      setDonateLoading(false);
    });
  };

  return (
    <div style={{padding: "10px 0"}}>
      <Link to={`/`}>
        ← Back to campaigns
      </Link>
      <Skeleton loading={isFetching} active>
        {status === "error" ? (
          <span>Error while fetching campaigns: {error.message}</span>
        ) : !isFetching ? (
          <Row gutter={[16, 16]}>
            <Col span={24} md={18}>
              <Card>
                <h2>{data.data.name}</h2>
                <p>{data.data.description}</p>
                <Space>
                  Goal amount:
                  <Tag color="processing">
                    ${data.data.goal_amount}
                  </Tag>
                </Space>
              </Card>
            </Col>
            <Col span={24} md={6}>
              <Card>
                <Form
                  name="donate"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[{required: true, message: 'Please input your nickname!'}]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{required: true, message: 'Please input the amount!'}]}
                  >
                    <InputNumber style={{width: '100%'}}/>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={donateLoading}>
                      Donate
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Skeleton>
    </div>
  );
};

export default Campaign;
