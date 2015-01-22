;(function(){
  if (typeof Hanoi === 'undefined'){
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el){
    this.game = game;
    this.$el = $el;
    this.tower = null;
    this.render();
  }

  View.prototype.installHandlers = function(){
    var that = this;

    $('.tower').on('click', function(event){
      var tower = $(event.currentTarget).data()["id"];
      that.clickTower(tower);
    })
  }

  View.prototype.render = function () {
    this.$el.empty();

    for (var i = 0; i < 3; i++) {
      var $tower = $('<div class="tower">');
      $tower.data("id", i);
      this.$el.append($tower);

      this.game.towers[i].forEach(function(disk){
        var $disk = $('<div class="disk">');
        $disk.addClass("d" + disk);
        $tower.append($disk);
      })
    }

    this.installHandlers();
  };

  View.prototype.clickTower = function(towerNum) {
    if (this.tower !== null){
      if (this.game.isValidMove(this.tower, towerNum)){
        this.game.move(this.tower, towerNum);
        if (this.game.isWon()) {
          alert("congrats!");
        }
      } else {
        alert("invalid move!");
      }
      this.tower = null;
      $($('.tower')[towerNum]).removeClass("highlighted");

    } else {
      this.tower = towerNum;
    }
    this.render();
    $($('.tower')[this.tower]).addClass("highlighted");
  }

})();
