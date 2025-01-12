import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckSquare, AlertCircle, XOctagon } from "lucide-react";

interface StatusCardProps {
  status: 'approved' | 'pending' | 'rejected';
  count: number;
}

const StatusCard = ({ status, count }: StatusCardProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckSquare,
          label: 'מאושרות',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          badgeClass: 'bg-green-100 text-green-700'
        };
      case 'pending':
        return {
          icon: AlertCircle,
          label: 'ממתינות',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          badgeClass: 'bg-yellow-100 text-yellow-700'
        };
      case 'rejected':
        return {
          icon: XOctagon,
          label: 'בוטלו',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
          badgeClass: 'bg-red-100 text-red-700'
        };
      default:
        return {
          icon: AlertCircle,
          label: 'לא ידוע',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          badgeClass: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} border-none shadow-sm`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${config.textColor}`} />
          <span className="font-medium">{config.label}</span>
        </div>
        <Badge variant="secondary" className={config.badgeClass}>
          {count}
        </Badge>
      </div>
    </Card>
  );
};

export default StatusCard;