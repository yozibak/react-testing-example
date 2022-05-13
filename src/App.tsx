import { Pages } from "Pages";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, useAuthStore } from "store/auth";
import { TodoContext, useTodoStore } from "store/todos";

export default function App() {

  const authStore = useAuthStore()
  const todoStore = useTodoStore(authStore.user)
  
  return (
    <AuthContext.Provider value={authStore}>
      <TodoContext.Provider value={todoStore}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  );
}