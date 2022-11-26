
    const input = document.getElementById("input");
    const btn_todo = document.getElementById("btn_todo");
    const container_todo = document.querySelector(".container_todo");

    const guardarTareas = () => {
        // guardo el input dentro de un objeto
        const tarea = {
            input_tarea: input.value
        }

        /*si en mi localStorage no existe ninguna tarea entonces,
        creo un arreglo, le agrego la tarea (el objeto tarea que tiene el valor del input)
        y le ingreso el arreglo al localStorage*/

        if (localStorage.getItem("tareas") === null) {
            let arreglo = [];
            arreglo.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(arreglo));
        } else {
            /*en caso ya existe tareas, primero las obtengo (me daría el arreglo)
            le ingreso la nueva tarea y lo vuelvo a ingresar al localStorage
            (BÁSICAMENTE LO ACTUALIZO) */
            let obtener = JSON.parse(localStorage.getItem("tareas"));
            obtener.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(obtener));
        }
        mostrarTareas();
        input.value = "";
    }

    const mostrarTareas = () => {

        let tareas_obtenidas = JSON.parse(localStorage.getItem("tareas"));
        container_todo.innerHTML = "";

        for (let i = 0; i < tareas_obtenidas.length; i++) {
            let input = tareas_obtenidas[i].input_tarea;

            container_todo.innerHTML += `
        <div class="container_list">
        <div class="container_list-1">
            <input type="checkbox" class="casilla">
            <p class="actividad">${input}</p>
        </div>
        <div class="container_list-btn">
            <button class="btn-eliminar" onclick="eliminarTareas('${input}')" ><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>
        `;
        }
    }

    const eliminarTareas = (tarea) => {
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        for (let i = 0; i < tareas.length; i++) {
            if (tarea === tareas[i].input_tarea) {
                tareas.splice(i, 1);
            }
        }
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareas();
    }


    // funcionalidad de agregar tarea
    btn_todo.addEventListener("click", () => {
        if (input.value === "" || input.value.trim() === "") {
            window.alert("Input vacío");
        } else {
            guardarTareas();
        }
    });


