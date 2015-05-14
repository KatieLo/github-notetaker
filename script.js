
// Parent component. Keeps track of state. Can pass state to child component using props.
var FriendsContainer = React.createClass({
    getInitialState: function(){
      return {
        name: 'Tyler McGinnis',
        friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen']
      }
    },
    addFriend: function(friend){
      this.state.friends.push(friend);
      this.setState({ // state manipulations (getters and setters) should be in same compoent where data is defined. So we pass addFriend method to the addFriend component as props.
        friends: this.state.friends
      });
    },
    render: function(){
      return (
        <div>
          <h3> Name: {this.state.name} </h3>
          <ShowList names={this.state.friends} />
        </div>
      )
    }
});


// AddFriend component 
var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },
  handleAddNew: function(){ // manipulate data from the component that cares about it. so we use props to get the state from parent, and we manipulate the data here.
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },
  render: function(){
    return (
        <div>
          <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
          <button onClick={this.handleAddNew}> Add Friend </button>
        </div>
    );
  }
});


// Child component. 
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.names.map(function(friend){ // Map over names, wrap each name in <li> tag and saving this to listItems. 
        return <li> {friend} </li>;
        });
    return ( 
    <div> 
    <h3> Friends </h3>
        <ul>
            {listItems}
        </ul>     
    </div>
    )
  }
});

React.render(<FriendsContainer /> , document.getElementById('app'));