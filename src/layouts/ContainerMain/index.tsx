import Container from '@mui/material/Container';

const  ContainerMain = ({ children }: any) => {
	return (
  <Container maxWidth={false} style={{ backgroundColor: "#cfd3d566", width: "55%", height: "1000px", marginTop: 10}}>
      {children}
  </Container>
  );
}

export default ContainerMain;