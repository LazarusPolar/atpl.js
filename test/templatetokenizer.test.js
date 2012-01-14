var ttlib  = require('../lib/lexer/TemplateTokenizer.js');
var assert = require('assert');
var fs     = require('fs');

TemplateTokenizer = ttlib.TemplateTokenizer;

module.exports = {
	'just plain text': function() {
		//console.log(assert);
		var templateTokenizer = new TemplateTokenizer('plain text');
		var tokens = templateTokenizer.tokenize();
		assert.equal(
			JSON.stringify([
				{type: "text", value: "plain text"}
			]),
			JSON.stringify(tokens)
		);
	},
	'comments test': function() {
		var templateTokenizer = new TemplateTokenizer('plain text {# this is a comment #} Hello! {# this is another comment #} ');
		var tokens = templateTokenizer.tokenize();
		assert.equal(
			JSON.stringify([
				{type: "text", value: "plain text "},
				{type: "text", value: " Hello! "},
				{type: "text", value: " "}
			]),
			JSON.stringify(tokens)
		);
	},
	'with expression test': function() {
		var templateTokenizer = new TemplateTokenizer('{%extends base%} {{ 1 + 2 + 3 }} {{ "string" }}');
		var tokens = templateTokenizer.tokenize();
		assert.equal(
			JSON.stringify([
				{type: "block", value: [
					{type: "id", value: "extends"},
					{type: "id", value: "base"}
				]},
				{type: "text", value: " "},
				{type: "expression", value: [
					{type: "number",   value: "1"},
					{type: "operator", value: "+"},
					{type: "number",   value: "2"},
					{type: "operator", value: "+"},
					{type: "number",   value: "3"}
				]},
				{type: "text", value: " "},
				{type: "expression", value: [
					{type: "string", value: "string"}]
				}
			]),
			JSON.stringify(tokens)
		);
	},
};