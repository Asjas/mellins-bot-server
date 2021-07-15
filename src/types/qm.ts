export type GetBalance = {
  response: {
    error: {
      code: number;
      description: string;
    };
    customer: {
      customer_id: string;
      branches: {
        [key: string]: {
          branch_code: string;
          branch_name: string;
          customer_number: string;
          customer_balance: string;
          patient_name: string;
        };
      };
      total_balance: string;
      customer_name: string;
      last_exam_date: string;
      exam_due_date: string;
    };
  };
};

export type GetStatement = {
  response: {
    error: {
      code: number;
      description: string;
    };
    branches: {
      [key: string]: {
        branch_code: string;
        branch_name: string;
        customer_number: string;
        customer_balance: string;
        patient_name: string;
        statement: string;
      };
    };
    total_balance: string;
    customer_name: string;
    last_exam_date: string;
    exam_due_date: string;
  };
};

export type GetNearestBranch = {
  response: {
    error: {
      code: number;
      description: string;
    };
    branch: {
      code: string;
      name: string;
      latitude: string;
      longitude: string;
      distance: string;
    };
  };
};

export type GetBranchList = {
  response: {
    error: {
      code: number;
      description: string;
    };
    branches: {
      [key: string]: {
        code: string;
        name: string;
        latitude: string;
        longitude: string;
        province: string;
      }[];
    };
  };
};
