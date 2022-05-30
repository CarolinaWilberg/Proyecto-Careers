# Proyecto Careers 

Bienvenidos a mi tercer proyecto con Ada ITW! En este caso les traigo un buscador y generador de ofertas laborales, destinado a carreras relacionadas con el mundo IT dentro de América.

Para la realización de este trabajo, se utilizó una API creada especialmente para este trabajo, en la página MockApi, donde quedarán almacenadas las ofertas creadas y editadas, y al mismo tiempo, las ofertas eliminadas no podrán volver a verse al recargar la página. Para el diseño de la página utilicé Sass, un procesador de CSS. Además, trabajé con diferentes ramas de Git que posteriormente fueron mergeadas a la rama principal (es decir, no hubo creación ni modificaciones desde la rama master).

## Partes del proyecto

![Página de inicio](/imagenes/pagina-inicio.jpg)

En la página de inicio podemos encontrar el encabezado (con un logo y dos links), el cuerpo de la página, que consta de un buscador por Ubicación, Nivel de Experiencia y Categoría, y las ofertas laborales cargadas, y un footer.

Comenzando con el encabezado, vemos el logo de la página (AdaCareers, que a la vez hace referencia al nombre del trabajo práctico), y al lado dos botones, uno de inicio, que utilizaremos para recargar la página de ser necesario, y el botón de Crear Oferta, que desplegará un formulario para poder crear una oferta nueva:

![Formulario para crear oferta nueva](/imagenes/formulario-crear.jpg)

En este formulario encontramos campos para completar (como el nombre del trabajo y la descripción), y campos con opciones tanto simples como múltiples. Las categorías tienen que ver con el mundo IT, y en la ubicación se podrán seleccionar unicamente paises de América. El botón de Guardar enviará la información cargada en el formulario a la API y creará una card con la oferta, mientras que el botón de Cancelar volverá al inicio. Si la carga es exitosa, se mostrará un aviso para que el usuario sepa que su petición se realizó correctamente: 

![Aviso de éxito](/imagenes/success-alert.jpg)

mientras que si hubo algún problema con la carga de la oferta, también aparecerá un aviso, en este caso de error:

![Aviso de error](/imagenes/error-alert.jpg)

Siguiendo con el cuerpo de la página, en cada card correspondiente a una oferta se puede leer el nombre de la oferta, una descripción en cinco renglones (si es más larga aparecerá "cortada", tres tags correspondientes a los criterios de búsqueda (ubicación, nivel de experiencia y categoría) y un botón para ver el detalle.

![Detalle de una oferta](/imagenes/detalle-card.jpg)

El detalle de una oferta consta del mismo nombre o título de la oferta, la descripción completa, los tags antes nombrados, y las tecnologías requeridas para el puesto. Debajo aparecen tres botones, editar, eliminar y cancelar (que volverá al inicio).

![Formulario para editar oferta](/imagenes/formulario-editar.jpg)

El botón de editar desplegará debajo del detalle de la oferta un formulario igual al de crear, pero con los datos de la oferta a editar ya cargados. Debajo, el botón Guardar enviará la información editada a la API y se modificará la oferta existente. Al igual que sucede con el formulario de crear nueva oferta, también en este caso se mostrarán avisos si la acción fue satisfactoria o no. 

El botón de eliminar borrará la oferta seleccionada. Al hacer click en este botón aparecerá un aviso en el que se pregunta al usuario si desea continuar con la acción. En caso de que se desee borrar la oferta, deberá hacer click en Eliminar, mientras que el botón Cancelar, volverá al detalle de la oferta, por si el usuario desea realizar otra acción sobre ella.

![Alerta de eliminación de oferta](/imagenes/warning-alert.jpg)

Por último, el panel de búsqueda filtrará las ofertas por Ubicación, Nivel de experiencia y Categoría. Al hacer click en el botón Buscar, aparecerán las ofertas que coincidan con los criterios de búsqueda especificados. El botón Limpiar, vuelve a poner los select con su valor por default y trae de vuelta todas las ofertas.

## Conclusión

Si bien la página web realizada no tiene una alta complejidad en cuento a lógica de programación, para este trabajo tuve que tener en cuenta y poner en práctica muchos conocimientos nuevos, lo cual fue un desafío pero a la vez agradezco, por tener la oportunidad de aplicar esto en un proyecto concreto. Es un trabajo que disfruté mucho realizando. Si llegaste hasta acá, gracias por leer y dar un vistazo a mi trabajo! Significa mucho para mi. Saludos! 