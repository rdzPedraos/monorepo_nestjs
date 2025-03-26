import "./App.css";

function App() {
  const testConnection = async () => {
    const response = await fetch("/api");
    const data = await response.text();
    console.log(data);
  };

  return (
    <>
      <button onClick={testConnection}>Click me</button>
    </>
  );
}

export default App;
