import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { make_api_call } from "../api/api";
import ClusterCard from "./ClusterCard";

interface Cluster {
  name: string;
  online: boolean;
  url: string;
  description: string;
  users: string[];
}

interface ClustersResponse {
  clusters: Cluster[];
}

const fetchClusters = async () => {
  return await make_api_call({
    path: "/clusters/list",
    onSuccess: (res) => {
      return res.json() as Promise<ClustersResponse>;
    },
  });
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <Clusters authToken={""} />
    </div>
  );
};

interface DashboardProps {
  authToken: string;
}

const Clusters: React.FC<DashboardProps> = ({ authToken }: DashboardProps) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);

  useEffect(() => {
    const fn = async () => {
      setClusters((await fetchClusters()).clusters);
    };
    fn();
  }, [authToken]);

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
        Clusters Dashboard
      </Typography>
      <Grid container spacing={2}>
        {clusters.map((cluster, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ClusterCard {...cluster} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
