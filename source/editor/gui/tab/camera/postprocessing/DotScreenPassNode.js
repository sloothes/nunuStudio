"use strict";

function DotScreenPassNode(parent)
{
	PassNode.call(this, parent, "Dot Screen");

	var self = this;

	this.addText("Angle");
	this.angle = new NumberBox(this);
	this.angle.size.set(60, 18);
	this.angle.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.pass, "angle", self.angle.getValue()));
	});
	this.add(this.angle);
	this.nextRow();

	this.addText(Locale.scale);
	this.scale = new NumberBox(this);
	this.scale.size.set(60, 18);
	this.scale.setOnChange(function()
	{
		Editor.addAction(new ChangeAction(self.pass, "scale", self.scale.getValue()));
	});
	this.add(this.scale);
	this.nextRow();

	this.addText(Locale.center);
	this.center = new VectorBox(this);
	this.center.setType(VectorBox.VECTOR2);
	this.center.size.set(120, 18);
	this.center.setStep(0.01);
	this.center.setOnChange(function()
	{
		var value = self.center.getValue();

		var center = self.pass.center.clone();
		center.set(value.x, value.y);

		Editor.addAction(new ChangeAction(self.pass, "center", center));
	});
	this.add(this.center);
	this.nextRow();
}

DotScreenPassNode.prototype = Object.create(PassNode.prototype);

PassNode.registerPass("DotScreen", DotScreenPassNode);

DotScreenPassNode.prototype.setPass = function(pass)
{
	PassNode.prototype.setPass.call(this, pass);

	this.angle.setValue(pass.angle);
	this.scale.setValue(pass.scale);
	this.center.setValue(pass.center);
};