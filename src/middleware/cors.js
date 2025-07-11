import cors from 'cors';

const corsOptions = {
  origin: '*', // ajuste conforme necessário
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export default cors(corsOptions);