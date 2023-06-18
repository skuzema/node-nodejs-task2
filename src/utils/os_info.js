import os from 'node:os';

export const getEOL = async () => {
  console.log('EOL:', JSON.stringify(os.EOL));
};

export const getCPUsInfo = async () => {
  const cpu = os.cpus().map((items) => ({
    Model: items.model.trim(),
    Rate: `${items.speed / 1000} GHz`,
  }));
  console.log('Overall amount of CPUS:', cpu.length);
  console.table(cpu);
};

export const getHomeDirectory = async () => {
  console.log('Home directory:', os.homedir());
};

export const getCurrentUserName = async () => {
  console.log('System user name:', os.userInfo().username);
};

export const getCPUArchitecture = async () => {
  console.log('CPU architecture:', os.arch());
};
