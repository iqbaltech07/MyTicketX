import { Card, CardBody, CardHeader } from "@heroui/react";

type StatCardProps = {
  title: string;
  value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card className="overflow-hidden rounded-lg bg-zinc-800 shadow p-3 w-[300px]">
      <CardHeader className="truncate text-sm font-medium text-zinc-400">{title}</CardHeader>
      <CardBody className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</CardBody>
    </Card>
  );
}

export default StatCard;