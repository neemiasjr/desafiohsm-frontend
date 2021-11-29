var dataObj=[];


$(document).ready(function(){

  window.onload = function () { 
      listaCursos();
  }

  formCursos = $('#formcursos');

  $('.enviar').click(function(e){
     if($('#acao').val()=='') {
      if($('#titulo').val() == ''){
        
        new Noty({
          type: 'error',
          layout: 'topRight',
          theme: 'relax',
          text     : 'Título vazio!!',
        }).show();
        e.preventDefault();
        return false;
      }

      if($('#descricao').val() == ''){
        
        new Noty({
          type: 'error',
          layout: 'topRight',
          theme: 'relax',
          text     : 'Descrição vazia!!',
        }).show();
        e.preventDefault();
        return false;
      }

      if($('#imagem').val() == ''){
        
        new Noty({
          type: 'error',
          layout: 'topRight',
          theme: 'relax',
          text     : 'Imagem vazia!!',
        }).show();
        e.preventDefault();
        return false;
      }

      if($('#nome_professor').val() == ''){
        
        new Noty({
          type: 'error',
          layout: 'topRight',
          theme: 'relax',
          text     : 'Nome do professor vazio!!',
        }).show();
        e.preventDefault();
        return false;
      }

      if($('#links').val() == ''){
        
        new Noty({
          type: 'error',
          layout: 'topRight',
          theme: 'relax',
          text     : 'Link vazio!!',
        }).show();
        e.preventDefault();
        return false;
      }
       
      criarCurso();
     }else{
      idCurso = $('#id').val();
      atualizarCurso(idCurso);
     }
  });
  $(".listaCursos").click(listaCursos);
  $(".criarCurso").click(criarCurso);
  $("tbody").on("click",".editarCurso",null,function(){
    var id = $(this).attr("id");
    carregarForm(id,'update');
  });
  $("tbody").on("click",".deletarCurso",null,function(){
    var id = $(this).attr("id");
    deletarCurso(id);
  });

  function limparForm(){
    $('#id').val("");
    $('#acao').val("");
    $('#titulo').val("");
    $('#descricao').val("");
  }
// GET Request
  function listaCursos()
  {
      $.ajax(
        {
           type:'GET',
           url: 'http://localhost:3000/cursos',
           success:function(data){
            $('.listaCursos').show();
            $("tbody").empty();
             for(var i = 0; i < data.length; i++){
           console.log("data",data);
            // $(".post-cover").append("<h1 class='title'>"+ data[i].title +"</h1>");
            // $(".post-cover").append("<p class='body'>"+ data[i].author +"</p>");
            // $(".post-cover").append("<p class='Id'>"+ data[i].id +"</p>");
          $("tbody").append(
                  "<tr>" + 
                      "<td>"+data[i].id+"</td>"+
                      "<td>"+data[i].titulo+"</td>"+ 
                      "<td>"+ data[i].descricao+"</td>"+
                      "<td><img src='"+ data[i].imagem+"'></td>"+
                      "<td>"+ data[i].nome_professor+"</td>"+
                      "<td>"+ data[i].lista_aula+"</td>"+
                      "<td><button id="+data[i].id+" class='deletarCurso'>Delete</button> "+
                      "<button id="+data[i].id+" class='editarCurso'>Edit</button></td>"+
                  "</tr>"
          );
         }
           },
           error:function(){
             console.log("error");
           }
        }
      );
  }

// POST Request
  function criarCurso()
  {
      var data = new Object();
      
      data.titulo = $('#titulo').val();
      data.descricao = $('#descricao').val();
      data.imagem = $('#imagem').val();
      data.nome_professor = $('#nome_professor').val();
      data.lista_aula = $('#links').val(data.lista_aula);

      
      //console.log(data.title,data.author,data.id);
      $.ajax(
        {
           type:'POST',
           url: 'http://localhost:3000/cursos',
           data: JSON.stringify(data),
           contentType:'application/json',
           success:function(data){
              listaCursos();
              console.log("added succesfully");
              Noty.overrideDefaults({
                    layout   : 'topRight',
                    theme    : 'mint',
                    text: 'Curso Criado com sucesso!!',
              });
           },
           error:function(){
              console.log("error");
           }
        }
      );
  }

// Delete Request
function deletarCurso(id){
  console.log("id",id);
  $.ajax(
    {
       type:'DELETE',
       url: 'http://localhost:3000/cursos/'+id,
       success:function(data){
        listaCursos();
         console.log("Deleted succesfully");
       },
       error:function(){
          console.log("error");
       }
    }
  );
}

function carregarForm(id,acao)
{
  $.ajax({
      type:'GET',
      url: `http://localhost:3000/cursos/${id}`,
      success:function(data){
        $('#id').val(data.id);
        $('#acao').val(acao);
        $('#titulo').val(data.titulo);
        $('#descricao').val(data.descricao);
        $('#imagem').val(data.imagem);
        $('#nome_professor').val(data.nome_professor);
        $('#links').val(data.lista_aula);
      },
      error:function(){
          console.log("error");
      }
  });
}

// PUT Request
function atualizarCurso(id)
{     
    if(id){
      var data = new Object();
      data.id = id;
      data.titulo = $('#titulo').val();
      data.descricao = $('#descricao').val();
      data.imagem = $('#imagem').val();
      data.nome_professor = $('#nome_professor').val();
      data.lista_aula = $('#links').val();

      //console.log( data.title, data.author, data.id )
      $.ajax(
        {
          type:'PUT',
          url: 'http://localhost:3000/cursos/'+data.id,
          data: JSON.stringify(data),
          contentType:'application/json',
          success:function(data){
            listaCursos();
            console.log("Updated succesfully");
          },
          error:function(){
              console.log("error");
          }
        }
      );
    }else{

    }
    
}
});