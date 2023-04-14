import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from "services/campaign";
import { Card, Empty, Skeleton, Space, Tag } from "antd";
import './styles.css';

const CampaignList = () => {
  const containerRef = useRef(null);

  const {status, data, error, isFetching} = useCampaigns();
  const [visibleCampaigns, setVisibleCampaigns] = useState([]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const scrollTop = container?.scrollTop;
    const scrollBottom = scrollTop + container?.offsetHeight;

    const visibleCampaigns = data?.data?.filter((campaign, index) => {
      const campaignRef = container?.children[index];
      const campaignTop = campaignRef?.offsetTop;
      const campaignBottom = campaignTop + campaignRef?.offsetHeight;
      return campaignTop < scrollBottom && campaignBottom > scrollTop;
    });

    setVisibleCampaigns(visibleCampaigns || []);
  }, [data]);

  useEffect(() => {
    if (!isFetching) {
      handleScroll();
    }
  }, [handleScroll, isFetching]);

  return (
    <div>
      <h2>Campaigns</h2>

      <div
        className="campaign-list-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <Skeleton loading={isFetching} active>
          {status === "error" ? (
            <span>Error while fetching campaigns: {error.message}</span>
          ) : (
            <>
              {data?.data.length > 0 ?
                data?.data.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className={`campaign ${
                      visibleCampaigns.includes(campaign)
                        ? 'fade-in'
                        : 'fade-out'
                    }`}
                  >
                    <h2>
                      <Space>
                        <Link to={`/campaign/${campaign.id}`}>
                          {campaign.name}
                        </Link>

                        <Tag color="success">
                          {campaign.status}
                        </Tag>
                      </Space>
                    </h2>
                    <p>{campaign.description}</p>
                  </Card>
                ))
                : <Empty />
              }
            </>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default CampaignList;
