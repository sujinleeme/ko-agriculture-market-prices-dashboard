import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export interface Item {
  item_name: string;
  rank: string;
  dpr3: string;
  dpr4: string;
  dpr5: string;
}

interface PriceLineChartProps {
  data: Item;
}

export const PriceLineChart: React.FC<PriceLineChartProps> = ({ data }: PriceLineChartProps) => {
  const createData = (item: Item) => {
    if (!item) return [];
    const { dpr3, dpr4, dpr5 } = item;

    const format = (value: string) => Number(value.replace(/\D/g, ''));

    const value = [
      { name: '1주일전', 가격: format(dpr3) },
      { name: '2주일전', 가격: format(dpr4) },
      { name: '1개월전', 가격: format(dpr5) },
    ];
    return value;
  };

  const item = createData(data);

  if (!data) return <div />;

  return (
    <div>
      <h1>{data.item_name}</h1>
      <LineChart
        width={500}
        height={300}
        data={item}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="가격" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};
