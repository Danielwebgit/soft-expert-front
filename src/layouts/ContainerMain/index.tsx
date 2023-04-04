import Container from '@mui/material/Container';

const  ContainerMain = ({ children }: any) => {
	return (
  <Container maxWidth={false} style={{ backgroundColor: "#cfd3d566", width: "55%", marginTop: 10, marginBottom: 40}}>
      {children}
  </Container>
  );
}

export default ContainerMain;